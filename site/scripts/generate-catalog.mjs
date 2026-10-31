/**
 * Scans sibling lyrixi-mobile / lyrixi-mobile-rn trees and writes
 * site/src/config/catalog.generated.ts for sidebar + demo routing.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const siteRoot = path.resolve(__dirname, '..')
const frontRoot = path.resolve(siteRoot, '../..')

const PRODUCTS = [
  {
    id: 'mobile',
    root: path.join(frontRoot, 'lyrixi-mobile'),
    packageName: 'lyrixi-mobile',
    /** Scan sibling sources for this product. */
    scan: true,
  },
  {
    id: 'mobile-rn',
    root: path.join(frontRoot, 'lyrixi-mobile-rn'),
    packageName: 'lyrixi-mobile-rn',
    // Reserved until npm publish — keep empty catalog stub.
    scan: false,
  },
]

/**
 * @param {string} filePath
 */
function parseFrontmatter(filePath) {
  const text = fs.readFileSync(filePath, 'utf8')
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) {
    return { title: path.basename(path.dirname(filePath)), group: '其他', groupOrder: 99, order: 99 }
  }

  const block = match[1]
  const titleMatch = block.match(/^title:\s*(.+)$/m)
  const orderMatch = block.match(/^order:\s*(\d+)\s*$/m)
  const groupTitleMatch = block.match(/group:\s*\n\s*title:\s*(.+)\n\s*order:\s*(\d+)/)

  return {
    title: titleMatch?.[1]?.trim() || path.basename(path.dirname(filePath)),
    group: groupTitleMatch?.[1]?.trim() || '其他',
    groupOrder: groupTitleMatch ? Number(groupTitleMatch[2]) : 99,
    order: orderMatch ? Number(orderMatch[1]) : 99,
  }
}

/**
 * @param {string} mdText
 */
function parseDemoRefsFromMd(mdText) {
  const refs = []
  const re = /<code\s+src=["']([^"']+)["']\s*>\s*<\/code>/g
  let m
  while ((m = re.exec(mdText)) !== null) {
    refs.push(m[1])
  }
  return refs
}

/**
 * @param {string} demoSrc e.g. ./demos/Common/index.tsx
 */
function demoKeyFromSrc(demoSrc) {
  const m = demoSrc.match(/\/demos\/(.+)\.(tsx|jsx)$/i)
  if (!m) return null
  const rel = m[1]
  if (rel.endsWith('/index')) {
    const folder = rel.slice(0, -'/index'.length)
    return folder.split('/').pop() || null
  }
  return rel.split('/').pop() || null
}

/**
 * @param {string} demosDir
 * @param {'components' | 'utils' | 'examples'} kind
 */
function collectDemos(demosDir, kind) {
  if (!fs.existsSync(demosDir)) return []

  /** @type {string[]} */
  const keys = []

  if (kind === 'examples') {
    for (const entry of fs.readdirSync(demosDir)) {
      const full = path.join(demosDir, entry)
      const stat = fs.statSync(full)
      if (stat.isFile() && /\.(tsx|jsx)$/.test(entry)) {
        keys.push(entry.replace(/\.(tsx|jsx)$/, ''))
        continue
      }
      if (!stat.isDirectory()) continue
      const hasIndex = ['index.tsx', 'index.jsx'].some((f) => fs.existsSync(path.join(full, f)))
      if (hasIndex) keys.push(entry)
    }
    return keys.sort((a, b) => a.localeCompare(b))
  }

  for (const file of fs.readdirSync(demosDir)) {
    if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      keys.push(file.replace(/\.(tsx|jsx)$/, ''))
    }
  }

  return keys.sort((a, b) => a.localeCompare(b))
}

/**
 * @param {string} absDir
 * @param {'components' | 'utils' | 'examples'} kind
 * @param {string} productId
 */
function scanKind(absDir, kind, productId) {
  if (!fs.existsSync(absDir)) return []

  /** @type {Array<Record<string, unknown>>} */
  const items = []

  for (const name of fs.readdirSync(absDir)) {
    const dir = path.join(absDir, name)
    if (!fs.statSync(dir).isDirectory()) continue

    const mdPath = path.join(dir, 'index.zh-CN.md')
    if (!fs.existsSync(mdPath)) continue

    const mdText = fs.readFileSync(mdPath, 'utf8')
    const meta = parseFrontmatter(mdPath)
    const demosDir = path.join(dir, 'demos')
    const demos = collectDemos(demosDir, kind)
    const mdDemoKeys = parseDemoRefsFromMd(mdText)
      .map(demoKeyFromSrc)
      .filter((k) => k != null)
    const primaryFromMd = mdDemoKeys.find((k) => demos.includes(k)) ?? mdDemoKeys[0]
    const primaryDemo = primaryFromMd ?? demos[0] ?? null

    items.push({
      productId,
      kind,
      name,
      slug: name.toLowerCase(),
      title: meta.title,
      group: meta.group,
      groupOrder: meta.groupOrder,
      order: meta.order,
      mdRelative: path.relative(frontRoot, mdPath).split(path.sep).join('/'),
      demos,
      primaryDemo,
    })
  }

  return items.sort((a, b) => {
    if (a.groupOrder !== b.groupOrder) return a.groupOrder - b.groupOrder
    if (a.order !== b.order) return a.order - b.order
    return String(a.name).localeCompare(String(b.name))
  })
}

/**
 * @param {string} skillsRoot
 */
function scanSkills(skillsRoot) {
  if (!fs.existsSync(skillsRoot)) return []
  return fs
    .readdirSync(skillsRoot)
    .filter((name) => fs.statSync(path.join(skillsRoot, name)).isDirectory())
    .map((name) => {
      const skillMd = path.join(skillsRoot, name, 'SKILL.md')
      let summary = ''
      if (fs.existsSync(skillMd)) {
        const text = fs.readFileSync(skillMd, 'utf8')
        const line = text.split('\n').find((l) => l.trim() && !l.startsWith('#') && !l.startsWith('---'))
        summary = line?.trim() || ''
      }
      return { id: name, summary }
    })
}

const catalog = {
  generatedAt: new Date().toISOString(),
  products: {},
}

for (const product of PRODUCTS) {
  if (!product.scan || !fs.existsSync(product.root)) {
    if (product.scan && !fs.existsSync(product.root)) {
      console.warn(`[catalog] missing ${product.root}, skip`)
    } else if (!product.scan) {
      console.log(`[catalog] ${product.id}: reserved (scan=false)`)
    }
    catalog.products[product.id] = {
      packageName: product.packageName,
      components: [],
      utils: [],
      examples: [],
      skills: [],
    }
    continue
  }

  catalog.products[product.id] = {
    packageName: product.packageName,
    components: scanKind(path.join(product.root, 'src/components'), 'components', product.id),
    utils: scanKind(path.join(product.root, 'src/utils'), 'utils', product.id),
    examples: scanKind(path.join(product.root, 'src/examples'), 'examples', product.id),
    skills: scanSkills(path.join(product.root, '.ai/skills')),
  }
}

const outFile = path.join(siteRoot, 'src/config/catalog.generated.ts')
const source = `/* eslint-disable */
/** Auto-generated by site/scripts/generate-catalog.mjs — do not edit by hand. */
export const catalog = ${JSON.stringify(catalog, null, 2)} as const
`

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, source, 'utf8')
console.log(`[catalog] wrote ${outFile}`)

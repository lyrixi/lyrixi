/**
 * Strip internal names and map/API keys from doc sources before dumi build.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const SCAN_DIRS = [
  path.join(root, 'mobile-src'),
  path.join(root, 'src-docs'),
  path.join(root, '.dumi/pages'),
]

const EXT = new Set(['.md', '.tsx', '.ts', '.jsx', '.js', '.json'])

const REPLACEMENTS = [
  [/\bqince\b/gi, '***'],
  [/\bwaiqin\b/gi, '***'],
  [/web:\s*'7b6e260fc45a67b31a265e22575f1c5e'/g, "web: ''"],
  [/web:\s*'4KFq5IGKQM1c6vkVhgIpAYFu'/g, "web: ''"],
  [/web:\s*'AIzaSy[A-Za-z0-9_-]+'/g, "web: ''"],
  [
    /https:\/\/macqj\.oss-cn-beijing\.aliyuncs\.com\/[^\s'"]+/g,
    'https://lyrixi.github.io/lyrixi/assets/test/2.jpg',
  ],
]

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === '.git') continue
      walk(full, files)
    } else if (EXT.has(path.extname(name))) {
      files.push(full)
    }
  }
  return files
}

let changed = 0
for (const dir of SCAN_DIRS) {
  for (const file of walk(dir)) {
    let text = fs.readFileSync(file, 'utf8')
    let next = text
    for (const [re, rep] of REPLACEMENTS) {
      next = next.replace(re, rep)
    }
    if (next !== text) {
      fs.writeFileSync(file, next)
      changed++
      console.log('[sanitize-docs]', path.relative(root, file))
    }
  }
}

console.log(`[sanitize-docs] done (${changed} file(s) updated)`)

/**
 * Copies repo-root `assets/` into `docs/assets/` after Vite build.
 * Vite JS/CSS chunks live under `docs/static/` to avoid colliding with this folder.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '../..')
const srcAssets = path.join(rootDir, 'assets')
const destAssets = path.join(rootDir, 'docs', 'assets')

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === '.DS_Store') continue
    const from = path.join(src, entry.name)
    const to = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(from, to)
    } else {
      fs.copyFileSync(from, to)
    }
  }
}

if (!fs.existsSync(srcAssets)) {
  console.warn(`[copy-assets] skip: missing ${srcAssets}`)
  process.exit(0)
}

if (!fs.existsSync(path.join(rootDir, 'docs'))) {
  console.error('[copy-assets] docs/ not found — run vite build first')
  process.exit(1)
}

if (fs.existsSync(destAssets)) {
  fs.rmSync(destAssets, { recursive: true, force: true })
}

copyDir(srcAssets, destAssets)
console.log(`[copy-assets] copied ${srcAssets} → ${destAssets}`)

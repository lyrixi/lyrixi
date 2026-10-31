import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const source = path.join(root, 'assets')
const target = path.join(root, 'docs', 'assets')

if (!fs.existsSync(source)) {
  console.warn('[copy-assets] skip: assets/ not found')
  process.exit(0)
}

fs.mkdirSync(target, { recursive: true })
fs.cpSync(source, target, { recursive: true })
console.log('[copy-assets] copied assets/ → docs/assets/')

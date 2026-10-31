/**
 * Sync markdown + demo sources from a local lyrixi-mobile checkout into this repo.
 * Runtime imports still resolve to the installed `lyrixi-mobile` npm package (esm).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const docsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const siblingMobile = path.resolve(docsRoot, '../lyrixi-mobile')

function copyDir(from, to) {
  fs.rmSync(to, { recursive: true, force: true })
  fs.cpSync(from, to, { recursive: true })
}

if (!fs.existsSync(path.join(siblingMobile, 'src/components'))) {
  console.error(
    `[sync-mobile-docs] Expected lyrixi-mobile at ${siblingMobile}. Clone it next to lyrixi or update paths.`,
  )
  process.exit(1)
}

copyDir(path.join(siblingMobile, 'src-docs'), path.join(docsRoot, 'src-docs'))
copyDir(path.join(siblingMobile, 'src'), path.join(docsRoot, 'mobile-src'))
console.log('[sync-mobile-docs] updated src-docs/ and mobile-src/ from lyrixi-mobile')

import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

const docsRoot = path.resolve(__dirname, '..')
const require = createRequire(path.join(docsRoot, 'package.json'))

const mobileEntry = require.resolve('lyrixi-mobile')

/** Compiled library entry (`lyrixi-mobile/esm`). */
export const MOBILE_ESM = path.dirname(mobileEntry)

/** Installed lyrixi-mobile package root (npm dependency). */
export const MOBILE_ROOT = path.dirname(MOBILE_ESM)

/** Demo templates shipped inside the npm package (relative for dumi scan). */
export const MOBILE_EXAMPLES_DIR = 'node_modules/lyrixi-mobile/src/examples'

/**
 * Markdown + demo sources synced from lyrixi-mobile (dumi only scans under the docs project root).
 */
export const MOBILE_SRC = path.join(docsRoot, 'mobile-src')

export function assertMobileDocsLayout() {
  if (!fs.existsSync(path.join(docsRoot, 'src-docs'))) {
    throw new Error('Missing src-docs/. Add guide pages under lyrixi/src-docs.')
  }
  if (!fs.existsSync(path.join(MOBILE_SRC, 'components'))) {
    throw new Error(
      'Missing mobile-src/components. Run `npm run sync:mobile-docs` or sync from lyrixi-mobile.',
    )
  }
  if (!fs.existsSync(path.join(docsRoot, MOBILE_EXAMPLES_DIR))) {
    throw new Error('lyrixi-mobile package missing src/examples. Reinstall lyrixi-mobile.')
  }
}

/**
 * Doc scan paths for lyrixi-mobile.
 * To add lyrixi-mobile-rn later: append atomDirs / docDirs for a second package root
 * (may need route prefixes or a second locale — validate in dumi before merging nav).
 */
export function mobileResolve() {
  assertMobileDocsLayout()
  return {
    docDirs: ['src-docs'],
    atomDirs: [
      { type: 'components', dir: 'mobile-src/components' },
      { type: 'examples', dir: MOBILE_EXAMPLES_DIR },
      { type: 'utils', dir: 'mobile-src/utils' },
    ],
  }
}

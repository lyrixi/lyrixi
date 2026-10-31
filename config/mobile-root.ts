import fs from 'node:fs'
import path from 'node:path'

const docsRoot = path.resolve(__dirname, '..')

/** Sibling component library (docs content + demo source). */
export const MOBILE_ROOT = path.resolve(docsRoot, '../lyrixi-mobile')

export function assertMobileRoot() {
  if (!fs.existsSync(path.join(MOBILE_ROOT, 'src', 'components'))) {
    throw new Error(
      `lyrixi-mobile not found at ${MOBILE_ROOT}. Clone it next to this repo (see README).`,
    )
  }
}

/**
 * Doc scan paths for lyrixi-mobile.
 * To add lyrixi-mobile-rn later: append atomDirs / docDirs for `../lyrixi-mobile-rn`
 * (may need route prefixes or a second locale — validate in dumi before merging nav).
 */
export function mobileResolve() {
  assertMobileRoot()
  return {
    docDirs: [path.join(MOBILE_ROOT, 'src-docs')],
    atomDirs: [
      { type: 'components', dir: path.join(MOBILE_ROOT, 'src/components') },
      { type: 'examples', dir: path.join(MOBILE_ROOT, 'src/examples') },
      { type: 'utils', dir: path.join(MOBILE_ROOT, 'src/utils') },
    ],
  }
}

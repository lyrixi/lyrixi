import _Text from './Text'
import getDisplayValue from './getDisplayValue'

import type { TextComponents } from './types/Text.modules.types'

const Text = _Text as TextComponents
Text.getDisplayValue = getDisplayValue

export default Text

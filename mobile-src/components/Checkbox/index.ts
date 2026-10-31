import _Checkbox from './Checkbox'
import Group from './Group'

import type { CheckboxComponents } from './types/Checkbox.modules.types'

const Checkbox = _Checkbox as CheckboxComponents
Checkbox.Group = Group

export default Checkbox

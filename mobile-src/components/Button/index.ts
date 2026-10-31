import _Button from './Button'
import Text from './Button/ButtonText'
import Icon from './Button/ButtonIcon'
import Group from './Group'

import type { ButtonComponents } from './types/Button.modules.types'

const Button = _Button as ButtonComponents
Button.Icon = Icon
Button.Text = Text
Button.Group = Group

export default Button

import AutoSize from './AutoSize'
import Number from './Number'
import NumberBox from './NumberBox'
import NumberKeyboard from './NumberKeyboard'
import OTP from './OTP'
import Password from './Password'
import PasswordStrength from './PasswordStrength'
import Range from './Range'
import Rate from './Rate'
import Tel from './Tel'
import Text from './Text'
import Node from './Node'
import Search from './Search'
import Select from './Select'
import Textarea from './Textarea'
import Url from './Url'

import Icon from './Icon'
import IconClear from './Icons/Clear'
import IconRightArrow from './Icons/RightArrow'
import IconLeftArrow from './Icons/LeftArrow'

import type { InputComponents } from './types/Input.modules.types'

const Input = {} as InputComponents
Input.AutoSize = AutoSize
Input.Number = Number
Input.NumberBox = NumberBox
Input.NumberKeyboard = NumberKeyboard
Input.OTP = OTP
Input.Password = Password
Input.PasswordStrength = PasswordStrength
Input.Range = Range
Input.Rate = Rate
Input.Tel = Tel
Input.Text = Text
Input.Node = Node
Input.Search = Search
// 库内基础 Select（入口仍对外暴露，类型见 types/Input.Select.types.ts）
Input.Select = Select
Input.Textarea = Textarea
Input.Url = Url
Input.Icon = Icon
Input.IconClear = IconClear
Input.IconRightArrow = IconRightArrow
Input.IconLeftArrow = IconLeftArrow

export default Input

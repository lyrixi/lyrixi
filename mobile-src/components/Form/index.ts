import _Form from './Form'
import Item from './Item'
import Label from './Label'
import Field from './Field'

import type { FormComponents } from './types/Form.modules.types'

const Form = _Form as FormComponents

Form.Item = Item
Form.Label = Label
Form.Field = Field

export default Form

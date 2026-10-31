import type { ReactNode } from 'react'

import type { DatePickerMultipleValue, DatePickerPickerType } from './DatePicker.common.types'
import type { DatePickerModalProps } from './DatePicker.Modal.types'

// 多选日期弹层
export interface DatePickerMultipleModalProps
  extends Omit<DatePickerModalProps, 'onOk' | 'onChange' | 'value' | 'titleRender'> {
  // Value & Display Value
  id?: string

  separator?: string
  value?: DatePickerMultipleValue
  onChange?: (value: DatePickerMultipleValue) => void
  onOk?: (
    value: DatePickerMultipleValue
  ) => boolean | DatePickerMultipleValue | void | Promise<boolean | void | DatePickerMultipleValue>
  titleRender?: (
    value: DatePickerMultipleValue | undefined,
    options: { type?: DatePickerPickerType }
  ) => ReactNode
}

import type { ReactNode } from 'react'

import type { DatePickerMultipleValue, DatePickerPickerType } from './DatePicker.common.types'
import type { DatePickerComboProps, DatePickerComboRef } from './DatePicker.Combo.types'

// 多选日期 Combo（Value 为带 value 字段的 tab 列表）
export interface DatePickerMultipleComboProps
  extends Omit<DatePickerComboProps, 'value' | 'onChange' | 'onOk' | 'titleRender'> {
  // Value & Display Value
  id?: string

  value?: DatePickerMultipleValue
  onChange?: (value: DatePickerMultipleValue, options?: { action: string }) => void
  onOk?: (
    value: DatePickerMultipleValue
  ) => boolean | DatePickerMultipleValue | void | Promise<boolean | void | DatePickerMultipleValue>
  titleRender?: (
    value: DatePickerMultipleValue | undefined,
    options: { type?: DatePickerPickerType }
  ) => ReactNode
}

export type DatePickerMultipleComboRef = DatePickerComboRef

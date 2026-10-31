import type { DatePickerMultipleValue, DatePickerPickerType } from './DatePicker.common.types'

// 多选 Main 区域
export interface DatePickerMultipleMainProps {
  // Value & Display Value
  id?: string
  value?: DatePickerMultipleValue
  type?: DatePickerPickerType | string
  min?: Date | null
  max?: Date | null
  hourStep?: number
  minuteStep?: number
  separator?: string
  // Status
  open?: boolean
  allowClear?: boolean
  // Events
  onChange?: (value: DatePickerMultipleValue) => void
}

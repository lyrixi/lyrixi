import type { CSSProperties } from 'react'

import type { DatePickerPickerType } from './DatePicker.common.types'

// 内库使用-start
import type { CalendarRef } from '../../Calendar/types'
import type { PickerMainRef } from '../../Picker/types'
// 内库使用-end

export type DatePickerMainRef = CalendarRef | PickerMainRef

export interface DatePickerMainProps {
  // Value & Display Value
  id?: string
  value?: Date | null
  type?: DatePickerPickerType
  min?: Date | null
  max?: Date | null
  hourStep?: number
  minuteStep?: number
  weekStart?: string
  // Status
  open?: boolean
  allowClear?: boolean
  // Style
  style?: CSSProperties
  className?: string
  // Events
  onChange?: (value: Date | null) => void
}

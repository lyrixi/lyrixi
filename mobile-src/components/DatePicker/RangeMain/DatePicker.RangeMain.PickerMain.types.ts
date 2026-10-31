import type { ReactNode } from 'react'

import type { DatePickerMultipleItem } from '../types/DatePicker.common.types'

export type DatePickerRangeMainPickerTab = DatePickerMultipleItem & {
  id: string
  description: ReactNode
  value: Date | null
  disabled?: boolean
}

export interface DatePickerRangeMainPickerMainProps {
  // Value & Display Value
  value?: (Date | null)[] | null
  type?: string
  min?: Date | null
  max?: Date | null
  hourStep?: number
  minuteStep?: number
  startDisabled?: boolean
  endDisabled?: boolean
  separator?: string
  // Status
  open?: boolean
  allowClear?: boolean
  // Elements
  portal?: HTMLElement | null
  // Events
  onChange?: (value: (Date | null)[] | null) => void
}

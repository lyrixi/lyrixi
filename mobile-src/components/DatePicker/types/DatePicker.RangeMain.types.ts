import type { ReactNode } from 'react'

import type { DatePickerRangeChangeMeta, DatePickerRangesMap } from './DatePicker.common.types'

// 区间主内容区（含快捷 + 双列表）
export interface DatePickerRangeMainProps {
  // Value & Display Value
  id?: string
  value?: (Date | null)[] | null
  rangeId?: string | null
  ranges?: DatePickerRangesMap
  type?: string
  min?: Date | null
  max?: Date | null
  hourStep?: number
  minuteStep?: number
  startDisabled?: boolean
  endDisabled?: boolean
  separator?: string
  titles?: { selector?: ReactNode; custom?: ReactNode }
  autoSwapValue?: boolean
  // Status
  open?: boolean
  rangesVisible?: boolean
  allowClear?: boolean
  // Elements
  portal?: HTMLElement | null
  // Events
  onChange?: (value: (Date | null)[] | null, options?: DatePickerRangeChangeMeta) => void
}

import type { CSSProperties } from 'react'

import type { DatePickerRangeChangeMeta, DatePickerRangesMap } from './DatePicker.common.types'

// 区间快捷 + 日期选择根组件
export interface DatePickerRangeSelectorProps {
  // Value & Display Value
  id?: string
  value?: (Date | null)[] | null
  autoSwapValue?: boolean
  type?: string
  rangeId?: string | null
  ranges?: DatePickerRangesMap
  min?: Date | null
  max?: Date | null
  hourStep?: number
  minuteStep?: number
  startDisabled?: boolean
  endDisabled?: boolean
  // Status
  allowClear?: boolean
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  portal?: HTMLElement | null
  // Events
  onChange?: (value: (Date | null)[] | null, options?: DatePickerRangeChangeMeta) => void
  onOk?: (value: (Date | null)[] | null) => void
}

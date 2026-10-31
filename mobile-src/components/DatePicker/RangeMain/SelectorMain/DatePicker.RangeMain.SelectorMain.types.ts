import type { CSSProperties } from 'react'

import type {
  DatePickerRangeChangeMeta,
  DatePickerRangesMap
} from '../../types/DatePicker.common.types'

export interface DatePickerRangeMainSelectorMainProps {
  // Value & Display Value
  value?: (Date | null)[] | null
  rangeId?: string | null
  ranges?: DatePickerRangesMap
  // Status
  allowClear?: boolean
  // Style
  className?: string
  style?: CSSProperties
  // Events
  onChange?: (value: (Date | null)[] | null, options?: DatePickerRangeChangeMeta) => void
}

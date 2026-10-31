import type { DatePickerRangesMap } from '../../types/DatePicker.common.types'

export interface DatePickerRangeSelectorButtonsProps {
  // Value & Display Value
  value?: (Date | null)[] | null
  rangeId?: string | null
  ranges?: DatePickerRangesMap
  // Status
  allowClear?: boolean
  // Events
  onChange?: (value: (Date | null)[] | null, options?: { rangeId?: string | null }) => void
}

import type { CSSProperties } from 'react'

// WeekMain 日历区
export interface DatePickerWeekMainProps {
  // Value & Display Value
  id?: string
  value?: Date | null
  min?: Date | null
  max?: Date | null
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

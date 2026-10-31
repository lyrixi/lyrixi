import type { ReactNode } from 'react'
import type React from 'react'

// A calendar grid cell: a Date plus optional flags from getMonthDates.
export type CalendarCellDate = Date & { isCurrent?: boolean }

export type CalendarSelectionMode = 'single' | 'multiple' | 'range'
export type CalendarType = 'week' | 'month'
export type CalendarWeekStart = 'Monday' | 'Sunday'
export type CalendarDraggableAxis = 'horizontal' | 'vertical'

export type CalendarValue = Date | Date[] | null | undefined

export type CalendarErrorObject = {
  code: string
  message: ReactNode
  date: Date
}

export type CalendarErrorCallback = (error: CalendarErrorObject) => void | boolean

export interface CalendarHeaderRenderParams {
  drawDate: Date | null
  onPreviousMonth: (e?: React.MouseEvent) => void | Promise<void>
  onNextMonth: (e?: React.MouseEvent) => void | Promise<void>
  onPreviousYear: (e?: React.MouseEvent) => void
  onNextYear: (e?: React.MouseEvent) => void
  /** Formatted title for convenience (same as default header). */
  title?: string
}

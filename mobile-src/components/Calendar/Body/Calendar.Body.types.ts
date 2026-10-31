import type React from 'react'

import type {
  CalendarCellDate,
  CalendarDraggableAxis,
  CalendarSelectionMode,
  CalendarValue
} from '../types/Calendar.common.types'
import type { CalendarProps } from '../types/Calendar.types'

export interface CalendarBodyRef {
  element: HTMLDivElement | null
}

export type CalendarBodyTouchDirection = 0 | 'horizontal' | 'vertical' | null

export interface CalendarBodyProps {
  // Modal: Status
  open?: boolean
  // Value & Display Value
  id?: string
  value?: CalendarValue
  selectionMode?: CalendarSelectionMode
  pages?: CalendarCellDate[][][] | null
  // Style
  cellHeight: number
  // Status
  min?: Date
  max?: Date
  draggable?: CalendarDraggableAxis[]
  allowClear?: boolean
  // Elements
  dateRender?: CalendarProps['dateRender']
  // Events
  onChange?: (date: CalendarCellDate, ctx: { action: 'select' | 'clear' }) => void
  onSlideX?: (action: 'previous' | 'next' | '') => void | Promise<void>
  onSlideY?: (action: 'expand' | 'collapse' | '') => void | Promise<void>
  onToggle?: (e: React.MouseEvent) => void
}

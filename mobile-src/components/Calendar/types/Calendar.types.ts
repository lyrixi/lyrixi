import type { CSSProperties, ReactNode } from 'react'

import type {
  CalendarCellDate,
  CalendarDraggableAxis,
  CalendarErrorObject,
  CalendarHeaderRenderParams,
  CalendarErrorCallback,
  CalendarSelectionMode,
  CalendarType,
  CalendarValue,
  CalendarWeekStart
} from './Calendar.common.types'

export interface CalendarRef {
  element: HTMLDivElement | null
  getCurrentType: () => CalendarType | null
  slideCollapse: () => Promise<void>
  slideExpand: () => Promise<void>
  slidePrevious: () => Promise<void>
  slideNext: () => Promise<void>
}

export interface CalendarProps {
  // Modal: Status
  open?: boolean
  // Value & Display Value
  id?: string
  value?: CalendarValue
  selectionMode?: CalendarSelectionMode
  type?: CalendarType
  weekStart?: CalendarWeekStart
  // Style
  style?: CSSProperties
  className?: string
  // Status
  min?: Date
  max?: Date
  allowClear?: boolean
  draggable?: CalendarDraggableAxis[]
  // Elements
  titleRender?: (date: Date | null, options: { type: CalendarType | null }) => ReactNode
  headerRender?: (options: CalendarHeaderRenderParams) => ReactNode
  dateRender?: (
    date: CalendarCellDate,
    options: {
      isSelected: string[] | null
      isDisabled: false | CalendarErrorObject
      isCurrent?: boolean
    }
  ) => ReactNode
  // Events
  onChange?: (
    value: CalendarValue,
    options: { currentDate: Date; action: 'select' | 'clear' }
  ) => void
  onPageChange?: (
    drawDate: Date | null,
    options: { action: string; type: CalendarType | null; pages: unknown }
  ) => void
  onError?: CalendarErrorCallback
}

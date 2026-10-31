import type { CSSProperties, ReactNode } from 'react'
import type React from 'react'

export interface CalendarHeaderRef {
  element: HTMLDivElement | null
}

export interface CalendarHeaderProps {
  // Value & Display Value
  id?: string

  // Style
  className?: string
  style?: CSSProperties
  // Elements
  children?: ReactNode
  // Events
  onPreviousMonth?: (e?: React.MouseEvent) => void
  onNextMonth?: (e?: React.MouseEvent) => void
  onPreviousYear?: (e?: React.MouseEvent) => void
  onNextYear?: (e?: React.MouseEvent) => void
}

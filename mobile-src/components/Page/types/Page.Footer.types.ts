import type { CSSProperties, ReactNode } from 'react'

export interface PageFooterProps {
  // Value & Display Value
  id?: string
  buttons?: unknown
  // Status
  safeArea?: boolean
  // Style
  className?: string
  style?: CSSProperties
  // Elements
  children?: ReactNode
  // Events
  onChange?: (value: unknown) => void
}

export interface PageFooterRef {
  element: HTMLElement | null
}

import type { CSSProperties, ReactNode } from 'react'

export interface RowProps {
  // Value & Display Value
  id?: string

  // Style
  style?: CSSProperties
  className?: string
  // Elements
  children?: ReactNode
}

export interface RowRef {
  element: HTMLDivElement | null
}

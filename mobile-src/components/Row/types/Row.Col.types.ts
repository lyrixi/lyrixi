import type { CSSProperties, ReactNode } from 'react'

export interface RowColProps {
  // Value & Display Value
  id?: string
  span?: number | 'auto'
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  children?: ReactNode
}

export interface RowColRef {
  element: HTMLDivElement | null
}

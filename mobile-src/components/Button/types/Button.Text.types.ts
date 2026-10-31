import type { CSSProperties, ReactNode } from 'react'

export interface ButtonTextProps {
  // Value & Display Value
  id?: string

  // Style
  style?: CSSProperties
  className?: string
  // Elements
  children?: ReactNode
}

export interface ButtonTextRef {
  element: HTMLDivElement | null
}

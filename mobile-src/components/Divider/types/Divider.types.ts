import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

export interface DividerProps {
  // Value & Display Value
  id?: string

  // Style
  style?: CSSProperties
  className?: string
  // Elements
  children?: ReactNode
  // Events
  onClick?: MouseEventHandler<HTMLDivElement>
}

export interface DividerRef {
  element: HTMLDivElement | null
}

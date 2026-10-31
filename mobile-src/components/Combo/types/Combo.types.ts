import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

export interface ComboProps {
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

export interface ComboRef {
  element: HTMLDivElement | null
}

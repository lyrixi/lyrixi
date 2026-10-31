import type { CSSProperties, ReactNode } from 'react'

export interface CardMainProps {
  // Value & Display Value
  id?: string

  // Style
  style?: CSSProperties
  className?: string
  // Elements
  children?: ReactNode
}

export interface CardMainRef {
  element: HTMLDivElement | null
}

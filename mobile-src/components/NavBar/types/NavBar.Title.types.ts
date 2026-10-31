import type { CSSProperties, ReactNode } from 'react'

export interface NavBarTitleRef {
  element: HTMLDivElement | null
}

export interface NavBarTitleProps {
  // Value & Display Value
  id?: string

  // Style
  className?: string
  style?: CSSProperties
  // Elements
  children?: ReactNode
}

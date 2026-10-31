import type { CSSProperties, ReactNode } from 'react'

export interface NavBarRightRef {
  element: HTMLDivElement | null
}

export interface NavBarRightProps {
  // Value & Display Value

  // Style
  className?: string
  style?: CSSProperties
  // Elements
  children?: ReactNode
}

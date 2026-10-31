import type { CSSProperties, ReactNode } from 'react'

export interface MessageTitleRef {
  element: HTMLDivElement | null
}

export interface MessageTitleProps {
  // Value & Display Value

  // Style
  className?: string
  style?: CSSProperties
  // Elements
  children?: ReactNode
}

import type { CSSProperties, ReactNode } from 'react'

export interface MessageHeaderRef {
  element: HTMLElement | null
}

export interface MessageHeaderProps {
  // Value & Display Value

  // Style
  className?: string
  style?: CSSProperties
  // Elements
  children?: ReactNode
}

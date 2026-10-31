import type { CSSProperties, ReactNode } from 'react'

export interface MessageFooterRef {
  element: HTMLElement | null
}

export interface MessageFooterProps {
  // Value & Display Value
  direction?: 'horizontal' | 'vertical'
  // Style
  className?: string
  style?: CSSProperties
  // Elements
  children?: ReactNode
}

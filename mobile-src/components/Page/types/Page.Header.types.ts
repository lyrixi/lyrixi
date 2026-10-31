import type { CSSProperties, ReactNode } from 'react'

export interface PageHeaderProps {
  // Value & Display Value
  id?: string

  // Status
  safeArea?: boolean
  // Style
  className?: string
  style?: CSSProperties
  // Elements
  children?: ReactNode
}

export interface PageHeaderRef {
  element: HTMLElement | null
}

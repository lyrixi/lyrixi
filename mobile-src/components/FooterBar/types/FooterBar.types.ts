import type { CSSProperties, ReactNode } from 'react'

export interface FooterBarRef {
  element: HTMLElement | null
}

export interface FooterBarProps {
  // Value & Display Value
  id?: string

  // Style
  className?: string
  style?: CSSProperties
  // Elements
  children?: ReactNode
}

import type { CSSProperties, ReactNode } from 'react'

export interface CardHeaderProps {
  // Value & Display Value
  id?: string

  // Style
  style?: CSSProperties
  className?: string
  // Elements
  children?: ReactNode
}

export interface CardHeaderRef {
  element: HTMLDivElement | null
}

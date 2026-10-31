import type { CSSProperties, ReactNode } from 'react'

export interface NavBarLeftRef {
  element: HTMLDivElement | null
}

export interface NavBarLeftProps {
  // Value & Display Value

  // Style
  className?: string
  style?: CSSProperties
  // Elements
  children?: ReactNode
}

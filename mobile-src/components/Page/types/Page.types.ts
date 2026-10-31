import type { CSSProperties, ReactNode } from 'react'

export interface PageProps {
  // Value & Display Value
  id?: string
  full?: boolean
  animation?: string
  // Status
  safeArea?: boolean
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  children?: ReactNode
}

export interface PageRef {
  element: HTMLElement | null
}

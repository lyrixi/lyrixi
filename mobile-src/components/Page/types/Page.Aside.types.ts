import type { CSSProperties, ReactNode } from 'react'

export interface PageAsideProps {
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

export interface PageAsideRef {
  element: HTMLElement | null
}

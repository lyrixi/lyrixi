import type { CSSProperties, ReactNode } from 'react'

export interface ToolBarProps {
  // Value & Display Value
  id?: string
  variant?: string
  // Style
  className?: string
  style?: CSSProperties
  // Elements
  children?: ReactNode
}

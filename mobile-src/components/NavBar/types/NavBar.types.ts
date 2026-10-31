import type { CSSProperties, ReactNode } from 'react'

export interface NavBarProps {
  // Value & Display Value
  id?: string

  // Style
  style?: CSSProperties
  className?: string
  // Elements
  title?: ReactNode
  children?: ReactNode
  leftRender?: () => ReactNode
  rightRender?: () => ReactNode
  // Events
  onBack?: () => void
}

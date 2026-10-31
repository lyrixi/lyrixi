import type { CSSProperties, ReactNode } from 'react'

export interface ListHeaderItemProps {
  // Value & Display Value
  id?: string
  description?: ReactNode
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  title?: ReactNode
}

import type { CSSProperties, ReactNode } from 'react'

export interface MediaMarkProps {
  // Value & Display Value
  id?: string
  labels?: ReactNode[]
  // Style
  style?: CSSProperties
  className?: string
}

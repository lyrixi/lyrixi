import type { CSSProperties } from 'react'

export interface SkeletonListProps {
  // Value & Display Value
  id?: string
  listLength?: number
  itemLength?: number
  // Status
  animated?: boolean
  safeArea?: boolean
  full?: boolean
  // Style
  className?: string
  style?: CSSProperties
  divider?: string
  animation?: string
}

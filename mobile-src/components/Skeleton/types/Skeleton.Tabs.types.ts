import type { CSSProperties } from 'react'

export interface SkeletonTabsProps {
  // Value & Display Value
  id?: string
  length?: number
  animated?: boolean
  // Style
  className?: string
  style?: CSSProperties
  tabClassName?: string
  tabStyle?: CSSProperties
}

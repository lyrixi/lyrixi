import type { CSSProperties } from 'react'

export interface SkeletonParagraphProps {
  // Value & Display Value
  id?: string
  length?: number
  divider?: string
  animated?: boolean
  // Status
  avatarVisible?: boolean
  titleVisible?: boolean
  // Style
  className?: string
  style?: CSSProperties
  avatarClassName?: string
  avatarStyle?: CSSProperties
  titleClassName?: string
  titleStyle?: CSSProperties
  itemClassName?: string
  itemStyle?: CSSProperties
  oddClassName?: string
  oddStyle?: CSSProperties
  evenClassName?: string
  evenStyle?: CSSProperties
}

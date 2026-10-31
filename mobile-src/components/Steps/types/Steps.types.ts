import type { CSSProperties } from 'react'

import type { StepsItem, StepsValue } from './Steps.common.types'

export interface StepsProps {
  // Value & Display Value
  value?: StepsValue
  list?: StepsItem[]
  // Style
  style?: CSSProperties
  className?: string
  iconSize?: number
  align?: string
  direction?: string
}

export interface StepsRef {
  element: HTMLDivElement | null
}

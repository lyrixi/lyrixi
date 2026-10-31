import type { CSSProperties } from 'react'

import type { SelectorEllipsis, SelectorItem } from './Selector.common.types'

export interface SelectorProps {
  // Value & Display Value
  value?: SelectorItem[]
  list: SelectorItem[]
  ellipsis?: SelectorEllipsis
  multiple?: boolean
  columns?: number
  id?: string
  // Status
  disabled?: boolean
  allowClear?: boolean
  // Style
  className?: string
  style?: CSSProperties
  // Events
  onChange?: (value: SelectorItem[]) => void | Promise<void>
}

export interface SelectorRef {
  element: HTMLDivElement | null
}

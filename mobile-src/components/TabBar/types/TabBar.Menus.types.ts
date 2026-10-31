import type { CSSProperties, ReactNode } from 'react'

import type { TabBarItem } from './TabBar.common.types'
import type { TabBarSize } from './TabBar.Size.types'

export interface TabBarMenusProps {
  // Value & Display Value
  id?: string
  separator?: ReactNode
  value?: TabBarItem
  list?: TabBarItem[]
  descriptionPlacement?: string
  // Status
  disabled?: boolean
  // Style
  gap?: number
  size?: TabBarSize
  block?: boolean
  className?: string
  style?: CSSProperties
  itemStyle?: CSSProperties
  itemClassName?: string
  // Events
  onChange?: (item: TabBarItem) => void
}

export interface TabBarMenusRef {
  element: HTMLDivElement | null
}

import type { CSSProperties, ReactNode } from 'react'

import type { TabBarItem } from './TabBar.common.types'
import type { TabBarSize } from './TabBar.Size.types'

export interface TabBarTabsProps {
  // Value & Display Value
  id?: string
  value?: TabBarItem
  list?: TabBarItem[]
  separator?: ReactNode
  descriptionPlacement?: string
  // Status
  disabled?: boolean
  // Style
  gap?: number
  size?: TabBarSize
  block?: boolean
  style?: CSSProperties
  className?: string
  itemStyle?: CSSProperties
  itemClassName?: string
  // Events
  onChange?: (item: TabBarItem) => void
}

export interface TabBarTabsRef {
  element: HTMLDivElement | null
}

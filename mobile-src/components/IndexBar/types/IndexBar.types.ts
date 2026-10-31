import type { CSSProperties } from 'react'

import type { ListItem } from '../../List/types'

export interface IndexBarRef {
  element: HTMLDivElement | null
  tooltipElement: HTMLDivElement | null
}

export interface IndexBarProps {
  /** 索引列表：id 用于匹配选中，name 用于显示 */
  list?: ListItem[]
  /** 当前选中项 */
  value?: ListItem | null
  /** 用户触摸选中时回调 */
  onChange?: (item: ListItem) => void
  // Style
  className?: string
  style?: CSSProperties
}

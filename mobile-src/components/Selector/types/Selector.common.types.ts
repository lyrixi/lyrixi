import type { ReactNode } from 'react'

// 列表项
export interface SelectorItem {
  id?: string | number
  name?: ReactNode
}

// 超出条数时折叠为「更多」
export interface SelectorEllipsis {
  count: number
}

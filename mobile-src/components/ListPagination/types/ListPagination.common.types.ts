import type { ReactNode } from 'react'

// 内库使用-start
import type { ListProps } from '../../List/types'
import type {
  ListAsyncItem,
  ListAsyncViewItem,
  ListAsyncListProps,
  ListLoadResult
} from '../../ListAsync/types'
// 内库使用-end

// ListPagination 对外列表项（扁平；仅 type: 'group' 为分组头）
export type ListPaginationItem = ListAsyncItem

// ListPagination 格式化后的渲染项
export type ListPaginationViewItem = ListAsyncViewItem

// Main / Modal / Combo 共用的列表与异步加载行为（复用 ListAsyncListProps，对外仍用 ListPaginationItem）
export interface ListPaginationListProps
  extends Omit<
    ListAsyncListProps,
    'value' | 'list' | 'formatViewItem' | 'prependRender' | 'appendRender' | 'onItemVisibleChange'
  > {
  value?: ListPaginationItem | ListPaginationItem[] | null
  list?: ListPaginationItem[]
  formatViewItem?: (
    item: ListPaginationItem,
    options: { index: number; result?: ListLoadResult | null }
  ) => ListPaginationViewItem
  prependRender?: (options: {
    list?: ListPaginationItem[]
    value?: ListPaginationItem | ListPaginationItem[] | null
    onChange?: ListProps['onChange']
  }) => ReactNode
  appendRender?: (options: {
    list?: ListPaginationItem[]
    value?: ListPaginationItem | ListPaginationItem[] | null
    onChange?: ListProps['onChange']
  }) => ReactNode
  onItemVisibleChange?: (item: ListPaginationItem) => void
}

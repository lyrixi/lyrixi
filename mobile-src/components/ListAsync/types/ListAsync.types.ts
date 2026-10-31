import type { CSSProperties, ReactNode } from 'react'

import type { ListAsyncItem, ListAsyncViewItem } from './ListAsync.common.types'

// 内库使用-start
import type { ListProps } from '../../List/types'
import type { PageMainProps, PageMainRef } from '../../Page/types'
// 内库使用-end

export interface ListAsyncVirtualProp {
  getItemHeight: (item: ListAsyncItem) => number
}

export type ListAsyncLoadAction = 'load' | 'reload' | 'topRefresh' | 'bottomRefresh' | 'retry' | ''

export interface ListAsyncScrollToLocationParams {
  id: string | number
}

export interface ListAsyncRef extends PageMainRef {
  element: HTMLElement | null
  scrollToLocation?: (params: ListAsyncScrollToLocationParams) => void
  reload?: (action?: string) => void
  getResult?: () => ListLoadResult | null
}

// List 异步加载成功时 `data`（ListAsync / ListPagination 共用）
export interface ListLoadResultData {
  list?: ListAsyncItem[]
  scrollTop?: number
  totalPage?: number
  totalRows?: number
  [key: string]: unknown
}

// List 异步加载结果，形态对齐 Bridge `{ status, code, data }`（ListAsync / ListPagination 共用）
export interface ListLoadResult {
  status: string
  code?: string
  message?: string
  data?: ListLoadResultData
}

/** ListAsync / ListPagination Main 共用的列表展示与异步刷新 props（列表项字段对齐 ListProps） */
export interface ListAsyncListProps
  extends Pick<
    ListProps,
    | 'multiple'
    | 'allowClear'
    | 'checkable'
    | 'itemStyle'
    | 'itemClassName'
    | 'itemLayout'
    | 'checkboxVariant'
    | 'checkboxPlacement'
    | 'itemRender'
    | 'onChange'
  > {
  // Status
  initialLoad?: boolean
  errorRetry?: boolean
  onLoad?: (options: { result: ListLoadResult | null; action: ListAsyncLoadAction }) => void
  topRefreshEnabled?: boolean
  bottomRefreshEnabled?: boolean
  emptyRetry?: boolean
  loadingRender?: (options: { action?: string }) => ReactNode
  loadingModalStyle?: CSSProperties
  loadingModalClassName?: string
  loadingMaskStyle?: CSSProperties
  loadingMaskClassName?: string
  loadingPortal?: HTMLElement
  children?: ReactNode
  // Value & Display Value
  value?: ListAsyncItem | ListAsyncItem[] | null
  list?: ListAsyncItem[]
  formatViewItem?: (
    item: ListAsyncItem,
    options: { index: number; result?: ListLoadResult | null }
  ) => ListAsyncViewItem
  virtual?: ListAsyncVirtualProp
  threshold?: number
  touchStopPropagation?: boolean
  safeArea?: boolean
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  prependRender?: (options: {
    list?: ListAsyncItem[]
    value?: ListAsyncItem | ListAsyncItem[] | null
    onChange?: ListProps['onChange']
  }) => ReactNode
  appendRender?: (options: {
    list?: ListAsyncItem[]
    value?: ListAsyncItem | ListAsyncItem[] | null
    onChange?: ListProps['onChange']
  }) => ReactNode
  /** 滚动时顶部可见项变化（对齐 SectionList onViewableItemsChanged 的顶部项场景） */
  onItemVisibleChange?: (item: ListAsyncItem) => void
  // Events
  onScroll?: PageMainProps['onScroll']
  onScrollEnd?: PageMainProps['onScrollEnd']
  onTopRefresh?: PageMainProps['onTopRefresh']
  onBottomRefresh?: PageMainProps['onBottomRefresh']
}

export interface ListAsyncProps extends ListAsyncListProps {
  loadData?: (options: {
    previousResult: ListLoadResult | null
    action: string
  }) => Promise<ListLoadResult>
  // Value & Display Value
  id?: string
  height?: number
}

interface ListAsyncVirtualListVirtualData {
  type?: string
  height: number
  top: number
  index: number
}

export type ListAsyncVirtualListVirtualItem = Record<string, unknown> & {
  virtualData: ListAsyncVirtualListVirtualData
}

export interface ListAsyncVirtualListGetVisibleItemsParams {
  prependHeight: number
  items: ListAsyncVirtualListVirtualItem[]
  itemHeights: number[]
  scrollTop: number | undefined
  containerHeight: number
}

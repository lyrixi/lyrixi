import type { ListAsyncVirtualProp } from 'lyrixi-mobile'

export type ListPaginationDemoRow = Record<string, unknown>

export type ListPaginationDemoMainProps = {
  cacheName?: string
  virtual?: ListAsyncVirtualProp
  queryParams?: Record<string, unknown>
}

export type ListPaginationDemoApiResult = {
  code?: string
  message?: string
  data?: { list?: unknown[]; totalPage?: number }
}

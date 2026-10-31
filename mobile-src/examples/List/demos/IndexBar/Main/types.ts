import type { ListLoadResult, ListAsyncVirtualProp, ListAsyncItem } from 'lyrixi-mobile'

export type IndexBarListLoadContext = {
  result: ListLoadResult | null
  action: string
}

export type ListDemoFormatPayloadParams = {
  page?: number
} & Record<string, unknown>

export type IndexBarListMainProps = {
  cacheName: string
  virtual?: ListAsyncVirtualProp
  queryParams: Record<string, unknown>
  onLoad?: (ctx: IndexBarListLoadContext) => void
  onItemVisibleChange?: (item: ListAsyncItem) => void
}

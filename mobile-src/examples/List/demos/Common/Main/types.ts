import type { ListAsyncVirtualProp } from 'lyrixi-mobile'

export type ListDemoFormatPayloadParams = {
  page?: number
} & Record<string, unknown>

export type ListDemoMainProps = {
  cacheName: string
  virtual?: ListAsyncVirtualProp
  queryParams: Record<string, unknown>
}

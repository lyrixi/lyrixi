import type { ListLoadResult, ListAsyncVirtualProp } from 'lyrixi-mobile'

export type MainProps = {
  virtual?: ListAsyncVirtualProp
  onLoad?: (ctx: { result: ListLoadResult | null; action: string }) => void
  onChange?: (value: unknown) => void
  loadData: (ctx: {
    previousResult: ListLoadResult | null
    action: string
  }) => Promise<ListLoadResult>
}

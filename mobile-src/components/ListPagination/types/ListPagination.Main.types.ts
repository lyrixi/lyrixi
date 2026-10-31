import type { ListPaginationListProps } from './ListPagination.common.types'

// 内库使用-start
import type { ListAsyncScrollToLocationParams, ListLoadResult } from '../../ListAsync/types'
// 内库使用-end

export interface ListPaginationMainProps extends ListPaginationListProps {
  // Value & Display Value
  id?: string

  cacheName?: string
  url?: string
  headers?: Record<string, string>
  payload?: Record<string, unknown>
  pagination?: { rows?: number }
  formatPayload?: (
    params: Record<string, unknown>
  ) => Promise<Record<string, unknown>> | Record<string, unknown>
  formatResponse?: (
    response: unknown,
    options: { payload: Record<string, unknown> }
  ) => Promise<ListLoadResult> | ListLoadResult
}

export interface ListPaginationMainRef {
  element?: HTMLElement | null
  scrollToLocation?: (params: ListAsyncScrollToLocationParams) => void
  reload?: (action?: string) => void
  getResult?: () => ListLoadResult | null
  updateCache?: (extraCache?: Record<string, unknown>) => void
  clearCache?: () => unknown
  getCache?: () => unknown
}

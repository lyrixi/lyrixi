import type { RefObject } from 'react'

// 内库使用-start
import type { ListLoadResult } from '../../../ListAsync/types'
// 内库使用-end

export interface ListPaginationQueryDataParams {
  rows?: number
  pageRef: RefObject<number>
  previousResult?: ListLoadResult | null
  action?: string
  formatPayload?: (
    params: Record<string, unknown>
  ) => Promise<Record<string, unknown>> | Record<string, unknown>
  formatResponse?: (
    response: unknown,
    options: { payload: Record<string, unknown> }
  ) => Promise<ListLoadResult> | ListLoadResult
}

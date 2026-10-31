import type { ListLoadResult, ListAsyncItem } from 'lyrixi-mobile'

import type { ListPaginationDemoApiResult } from './../ListPagination.demos.types'

import mockResult from './mockResult'

// 转换 API 返回数据为页面所需格式
function formatResponse(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _response: unknown,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _options: { payload: Record<string, unknown> }
): ListLoadResult {
  // 测试数据
  // eslint-disable-next-line
  const result: ListPaginationDemoApiResult = mockResult as ListPaginationDemoApiResult
  if (result.code === '1') {
    return {
      status: 'success',
      code: result.code,
      data: {
        list: result?.data?.list as ListAsyncItem[] | undefined,
        totalPage: result?.data?.totalPage
      }
    }
  }
  return {
    status: 'error',
    code: result.code,
    message: result.message
  }
}

export default formatResponse

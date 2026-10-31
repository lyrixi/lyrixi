import type { ListLoadResult, ListAsyncItem } from 'lyrixi-mobile'

import mockResult from './mockResult'

// 转换 API 返回数据为页面所需格式
function localData(
  response: unknown,
  _options: { payload: Record<string, unknown> }
): ListLoadResult {
  // 测试数据
  // eslint-disable-next-line
  response = mockResult
  const r = response as {
    code?: string
    message?: string
    data?: { list?: unknown; totalPage?: number }
  }
  if (r.code === '1') {
    return {
      status: 'success',
      code: r.code,
      data: {
        list: r.data?.list as ListAsyncItem[] | undefined,
        totalPage: r.data?.totalPage
      }
    }
  }
  return {
    status: 'error',
    code: r.code,
    message: r.message
  }
}

export default localData

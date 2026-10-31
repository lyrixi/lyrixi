import { LocaleUtil, Request } from 'lyrixi-mobile'

import localData from './localData'
import serverData from './serverData'

// 获取列表
let page = 1
// 兼容新 ListAsync 要求：外部仍返回数组，调用处已包装为新对象
function queryData(params: Record<string, unknown>, opts: { action?: string } = {}) {
  const { action } = opts
  return new Promise((resolve) => {
    if (action === 'bottomRefresh') {
      page++
    } else {
      page = 1
    }
    params.page = page
    Request.post(
      '/api/examples/list/query',
      { ...serverData(params) },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // application/json;charset=UTF-8
        }
      }
    )
      .then((result: unknown) => {
        const r = result as { code?: string; message?: string }
        if (r.code === '1') {
          let data = localData(result)
          let status = 'loading'
          // 无数据
          if (!data || data?.list?.length === 0) {
            status = 'empty'
          }
          // 最后一页
          else if ((data.totalPage ?? 0) >= page || (data?.list?.length ?? 0) > 50) {
            status = 'noMore'
          }

          resolve({
            status: status,
            message: '',
            data: data
          })
        } else {
          resolve({
            status: 'error',
            message: r.message || LocaleUtil.locale('获取数据错误！'),
            data: null
          })
        }
      })
      .catch((err: unknown) => {
        const e = err as { data?: { message?: string } }
        resolve({
          status: 'error',
          message: e?.data?.message || LocaleUtil.locale('获取数据异常！'),
          data: null
        })
      })
  })
}

export default queryData

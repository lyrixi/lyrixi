import { LocaleUtil, Request } from 'lyrixi-mobile'

const locale = LocaleUtil.locale

// 获取报表数据
function queryData(params: unknown) {
  return new Promise((resolve) => {
    Request.post('/api/examples/report/query', params, {
      // headers: {
      //   'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      //   'content-type': 'application/json'
      // }
    })
      .then((result: unknown) => {
        const r = result as { code?: string; message?: string; data?: unknown }
        if (r.code === '1') {
          let list = r.data
          // Empty
          if (!Array.isArray(list) || !list.length) {
            resolve({
              status: 'empty',
              message: locale('暂无报表数据')
            })
          }
          // Success
          else {
            resolve({ data: list })
          }
        } else {
          resolve({
            status: '500',
            message: r.message || locale('服务器繁忙，请稍后重试')
          })
        }
      })
      .catch((err: unknown) => {
        const e = err as { data?: { message?: string } }
        resolve({
          status: '500',
          message: e?.data?.message || locale('服务器繁忙，请稍后重试')
        })
      })
  })
}

export default queryData

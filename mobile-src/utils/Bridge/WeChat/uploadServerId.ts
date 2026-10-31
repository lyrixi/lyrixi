// 内库使用-start
import Request from './../../Request'
import LocaleUtil from './../../LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { Request, LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

function uploadServerId(params?: {
  url?: string
  headers?: Record<string, string>
  payload?: Record<string, unknown>
}) {
  const { url, headers, payload } = params || {}
  return new Promise((resolve) => {
    Request.post(url ?? '', payload, {
      headers: headers || {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(async (result) => {
        resolve({
          status: 'success',
          code: '',
          message: '',
          data: result
        })
      })
      .catch((error) => {
        resolve({
          status: 'error',
          message:
            error?.response?.data?.message ||
            `WeChat ${LocaleUtil.locale(
              '上传serverId异常',
              'lyrixi_f630459aa61d3a30b13b806a8935e6d6'
            )}`
        })
      })
  })
}

export default uploadServerId

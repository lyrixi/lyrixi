// 内库使用-start
import Request from './../../../utils/Request'
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { Request, LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

function uploadFile({
  url,
  headers,
  payload
}: {
  url: string
  headers?: Record<string, string>
  payload?: Record<string, string | Blob>
}) {
  return new Promise((resolve) => {
    const newPayload = new FormData()
    for (const key in payload) {
      newPayload.append(key, payload[key])
    }

    console.log('调用浏览器uploadFile:', { url, headers, newPayload })

    Request.post(url, newPayload, {
      headers: headers || {
        'Content-Type': 'multipart/form-data'
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
            `Browser ${LocaleUtil.locale('上传异常', 'lyrixi_fca68477eea513705b6832eead2f87eb')}`
        })
      })
  })
}

export default uploadFile

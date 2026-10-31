import { Device, Loading, LocaleUtil, Request } from 'lyrixi-mobile'

const locale = LocaleUtil.locale

// 审批数据
async function approveData(_opts?: { token?: string }) {
  Loading.open()
  let id = Device.getUrlParameter('id')

  return new Promise((resolve) => {
    Request.post(
      '/api/examples/detail/approve',
      { id: id },
      {
        headers: {
          'content-type': 'application/json'
        }
      }
    )
      .then((result) => {
        Loading.close()
        resolve(result)
      })
      .catch((err: unknown) => {
        Loading.close()
        const e = err as { data?: { message?: string } }
        resolve({
          code: '0',
          message: e?.data?.message || locale('服务器繁忙，请稍后重试！')
        })
      })
  })
}

export default approveData

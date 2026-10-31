import { Device, Loading, LocaleUtil, Request } from 'lyrixi-mobile'

import serverData from './serverData'

const locale = LocaleUtil.locale

// 提交数据
async function saveData(opts: { baseData?: unknown; data?: unknown; token?: string }) {
  const { baseData, data, token } = opts
  Loading.open()

  // 构建服务器参数
  let params = (await serverData({ baseData, data })) as Record<string, unknown>

  const url = '/api/examples/save'

  // 编辑时附带 id
  const id = Device.getUrlParameter('id')
  if (id) {
    params.id = id
  }

  return new Promise((resolve) => {
    Request.post(url, params, {
      headers: {
        tokenDup: token,
        'content-type': 'application/json'
      }
    })
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

export default saveData

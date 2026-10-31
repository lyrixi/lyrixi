import { Loading, LocaleUtil, Request } from 'lyrixi-mobile'

import type { LoginApiResult } from '../../../utils/types'

const locale = LocaleUtil.locale

async function sendLoginCode(phone: string) {
  Loading.open()

  try {
    const result = (await Request.post(
      '/user/login/sendLoginCode',
      { phone },
      {
        headers: {
          'content-type': 'application/json'
        }
      }
    )) as LoginApiResult
    Loading.close()
    return result
  } catch (err: unknown) {
    Loading.close()
    const error = err as { data?: { message?: string } }
    return {
      code: '0',
      message: error?.data?.message || String(locale('服务器繁忙，请稍后重试！'))
    } as LoginApiResult
  }
}

export default sendLoginCode

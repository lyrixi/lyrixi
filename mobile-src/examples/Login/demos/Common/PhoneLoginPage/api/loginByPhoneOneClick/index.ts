import { Loading, LocaleUtil, Request } from 'lyrixi-mobile'

import type { LoginApiResult, LoginClientInfo } from '../../../utils/types'
import serverData from './serverData'

const locale = LocaleUtil.locale

async function loginByPhoneOneClick(opts: {
  phone: string
  code: string
  clientInfo: LoginClientInfo
}) {
  Loading.open()
  const params = serverData(opts)

  try {
    const result = (await Request.post('/user/login/loginByPhoneOneClick', params, {
      headers: {
        'content-type': 'application/json'
      }
    })) as LoginApiResult
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

export default loginByPhoneOneClick

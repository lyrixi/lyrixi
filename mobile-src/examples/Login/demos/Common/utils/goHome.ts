import { LocaleUtil, Router, Storage, Toast } from 'lyrixi-mobile'

import type { LoginApiResult } from './types'

const locale = LocaleUtil.locale
const LOGIN_TOKEN_KEY = 'education:login:token'
const HOME_ROUTE = '/main'

async function saveLoginToken(token: string) {
  await Storage.setItem(LOGIN_TOKEN_KEY, token)
}

export async function goHome(result: LoginApiResult) {
  if (result.code === '1' && result.data?.token) {
    await saveLoginToken(result.data.token)
    Router.replace(HOME_ROUTE)
    return true
  }

  Toast.open({
    content: result.message || String(locale('登录失败，请稍后重试'))
  })
  return false
}

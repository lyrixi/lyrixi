import { LocaleUtil, type FieldValidator } from 'lyrixi-mobile'

import isValidUsername from './isValidUsername'

const locale = LocaleUtil.locale

function usernameValidator(): FieldValidator {
  return (value) => {
    if (!isValidUsername(value)) {
      return Promise.reject(new Error(String(locale('请输入邮箱或手机号'))))
    }
    return Promise.resolve()
  }
}

export default usernameValidator

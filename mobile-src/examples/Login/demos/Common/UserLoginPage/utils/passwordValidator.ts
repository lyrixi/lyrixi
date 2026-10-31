import { LocaleUtil, type FieldValidator } from 'lyrixi-mobile'

import isValidPassword from './isValidPassword'

const locale = LocaleUtil.locale

function passwordValidator(): FieldValidator {
  return (value) => {
    if (!isValidPassword(value)) {
      return Promise.reject(new Error(String(locale('请输入密码'))))
    }
    return Promise.resolve()
  }
}

export default passwordValidator

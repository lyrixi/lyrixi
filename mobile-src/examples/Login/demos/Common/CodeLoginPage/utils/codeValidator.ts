import { LocaleUtil, type FieldValidator } from 'lyrixi-mobile'

import isValidCode from './isValidCode'

const locale = LocaleUtil.locale

function codeValidator(): FieldValidator {
  return (value) => {
    if (!isValidCode(value)) {
      return Promise.reject(new Error(String(locale('请输入验证码'))))
    }
    return Promise.resolve()
  }
}

export default codeValidator

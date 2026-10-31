import { LocaleUtil, type FieldValidator } from 'lyrixi-mobile'

import isValidPhone from './isValidPhone'

const locale = LocaleUtil.locale

function phoneValidator(): FieldValidator {
  return (value) => {
    if (!isValidPhone(value)) {
      return Promise.reject(new Error(String(locale('请输入正确的手机号'))))
    }
    return Promise.resolve()
  }
}

export default phoneValidator

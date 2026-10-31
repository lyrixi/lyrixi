import { ValidatorUtil } from 'lyrixi-mobile'

function isValidPhone(value: unknown): boolean {
  return ValidatorUtil.isPhoneNumber(String(value || '').trim()) === true
}

export default isValidPhone

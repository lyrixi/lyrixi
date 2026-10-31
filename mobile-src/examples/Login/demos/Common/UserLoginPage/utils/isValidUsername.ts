import { ValidatorUtil } from 'lyrixi-mobile'

function isValidUsername(value: unknown): boolean {
  const username = String(value || '').trim()
  return ValidatorUtil.isPhoneNumber(username) === true || ValidatorUtil.isEmail(username)
}

export default isValidUsername

import type { LanguageCode } from '../LocaleUtil/types'

import type { IsMobilePhoneOptions } from './types'

/** zh_CN：11 位数字，或 +86 前缀 + 11 位数字 */
const zhCNPattern = /^(\+86)?\d{11}$/

function isPhoneNumber(
  str: string,
  locale: LanguageCode | LanguageCode[] = 'zh_CN',
  options?: IsMobilePhoneOptions
): boolean | null {
  const locales = Array.isArray(locale) ? locale : [locale]

  if (!locales.includes('zh_CN')) {
    return null
  }

  if (options?.strictMode && !str.startsWith('+')) {
    return false
  }

  return zhCNPattern.test(str)
}

export default isPhoneNumber

import type { LocaleUtilLoadLocaleResult } from './loadLocale.types'

import loadDayjsLanguage from './loadDayjsLanguage'
import loadLyrixiLanguage from './loadLyrixiLanguage'

// 加载国际化文件
async function loadLocale(language: string, { dayjs = true }: { dayjs?: boolean } = {}) {
  let result: LocaleUtilLoadLocaleResult = {
    status: 'error',
    message: 'language is null'
  }
  if (!language) {
    return result
  }

  // 加载dayjs国际化语言文件
  if (dayjs) {
    result = (await loadDayjsLanguage(language)) as LocaleUtilLoadLocaleResult
    if (result.status === 'error') {
      return result
    }
  }

  // 加载lyrixi国际化语言文件
  result = await loadLyrixiLanguage(language)
  return result
}

export default loadLocale

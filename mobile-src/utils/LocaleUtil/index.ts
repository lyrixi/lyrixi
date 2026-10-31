import languageMap from './languageMap'
import loadLocale from './loadLocale'
import setLocale from './setLocale'
import locale from './locale'
import defaultGetLanguage from './getLanguage'

// 记录语言: window.lyrixiLocaleLanguage, window.lyrixiLocaleData
const LocaleUtil = {
  // 存储自定义 getLanguage 函数
  _getCustomGetLanguages: [] as Array<() => string | null | undefined>,
  /**
   * 添加自定义获取当前语言的函数
   * @param {Function} getCustomLanguage - 自定义函数，返回当前语言字符串（如 'zh_CN'），若无法识别可返回 null/undefined 则使用默认逻辑
   * @example
   * LocaleUtil.addGetLanguage(() => {
   *   const lang = window.myAppLanguage
   *   return lang || null
   * })
   */
  addLanguage(getCustomLanguage: () => string | null | undefined): void {
    if (typeof getCustomLanguage === 'function') {
      this._getCustomGetLanguages.push(getCustomLanguage)
    }
  },
  getLanguage() {
    for (const getCustomGetLanguage of this._getCustomGetLanguages) {
      const result = getCustomGetLanguage()
      if (result !== null && result !== undefined && result !== '') {
        return result
      }
    }
    return defaultGetLanguage()
  },
  locale: locale,
  loadLocale: loadLocale,
  setLocale: setLocale,
  getLanguageMap: (language?: string) => {
    if (language) {
      return (languageMap as Record<string, unknown>)?.[language] || null
    }
    return languageMap
  }
}

export default LocaleUtil

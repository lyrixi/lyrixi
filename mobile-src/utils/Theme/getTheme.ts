import variablesDefault from './../VariablesUtil/variablesDefault'

import type { Variables } from './../VariablesUtil/types'

// 获取主题；不传 themeName 时返回当前已应用主题
function getTheme(themeName?: string): Variables {
  const store = window.lyrixiThemes || {}
  const name = themeName ?? window.currentThemeName ?? 'default'
  return (store[name] || store.default || variablesDefault) as Variables
}

export default getTheme

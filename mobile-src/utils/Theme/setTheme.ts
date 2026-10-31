import applyCssVariables from './applyCssVariables'
import variablesDefault from './../VariablesUtil/variablesDefault'

import type { Variables } from './../VariablesUtil/types'

// 按主题名应用 CSS 变量
function setTheme(themeName: string): Variables {
  const store = window.lyrixiThemes || {}
  const theme = (store[themeName] || store.default || variablesDefault) as Variables
  window.currentThemeName = store[themeName] ? themeName : 'default'
  applyCssVariables(theme)
  return theme
}

export default setTheme

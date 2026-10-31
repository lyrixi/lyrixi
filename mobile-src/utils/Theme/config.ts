import variablesDefault from './../VariablesUtil/variablesDefault'

import type { Variables } from './../VariablesUtil/types'
import type { Themes } from './types'

// 注册 / 覆盖主题，写入 window.lyrixiThemes
function config(themes: Themes): Record<string, Variables> {
  const store = window.lyrixiThemes || {}

  for (const [name, partial] of Object.entries(themes)) {
    const base = store[name] || store.default || variablesDefault
    store[name] = { ...base, ...partial } as Variables
  }

  return store
}

export default config

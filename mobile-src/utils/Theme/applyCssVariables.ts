import type { Variables } from './../VariablesUtil/types'

// Web：将主题 token 同步到 documentElement CSS 变量；RN / 无 DOM 跳过
function applyCssVariables(partial: Partial<Variables>): void {
  if (typeof document === 'undefined') {
    return
  }

  const root = document.documentElement
  for (const key of Object.keys(partial)) {
    const value = partial[key]
    if (value === undefined) {
      continue
    }
    root.style.setProperty(`--${key}`, value)
  }
}

export default applyCssVariables

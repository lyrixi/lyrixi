import variables from './variables'
import type { BorderColor } from './types'

// 解析边框色：命中 token 返回变量值，否则返回原值
function getBorderColorValue(name?: BorderColor | string): string | undefined {
  if (!name) {
    return undefined
  }

  if (name === 'default') {
    return variables['lyrixi-border-color']
  }

  const borderValue = variables[`lyrixi-border-color-${name}`]
  if (typeof borderValue === 'string') {
    return borderValue
  }

  const colorValue = variables[`lyrixi-color-${name}`]
  return typeof colorValue === 'string' ? colorValue : name
}

export default getBorderColorValue

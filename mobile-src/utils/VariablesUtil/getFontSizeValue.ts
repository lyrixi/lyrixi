import variables from './variables'
import type { FontSize } from './types'

// 解析字号：仅 string 查 token；非 string（如 number）原样返回
function getFontSizeValue(name?: FontSize | string | number): string | number | undefined {
  if (!name || typeof name !== 'string') {
    return name
  }

  const value = variables[`lyrixi-font-size-${name}`]
  return typeof value === 'string' ? value : name
}

export default getFontSizeValue

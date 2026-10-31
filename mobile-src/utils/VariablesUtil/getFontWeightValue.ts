import variables from './variables'
import type { FontWeight } from './types'

// 解析字重：仅 string 查 token；非 string（如 number）原样返回
function getFontWeightValue(name?: FontWeight | string | number): string | number | undefined {
  if (!name || typeof name !== 'string') {
    return name
  }

  const value = variables[`lyrixi-font-weight-${name}`]
  return typeof value === 'string' ? value : name
}

export default getFontWeightValue

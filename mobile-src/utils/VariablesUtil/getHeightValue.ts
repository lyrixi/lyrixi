import variables from './variables'
import type { Height } from './types'

// 解析高度：仅 string 查 token；非 string（如 number）原样返回
function getHeightValue(name?: Height | string | number): string | number | undefined {
  if (!name || typeof name !== 'string') {
    return name
  }

  const value = variables[`lyrixi-height-${name}`]
  return typeof value === 'string' ? value : name
}

export default getHeightValue

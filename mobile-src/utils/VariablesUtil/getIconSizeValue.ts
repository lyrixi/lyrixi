import variables from './variables'
import type { IconSize } from './types'

// 解析图标尺寸：仅 string 查 token；非 string（如 number）原样返回
function getIconSizeValue(name?: IconSize | string | number): string | number | undefined {
  if (!name || typeof name !== 'string') {
    return name
  }

  const value = variables[`lyrixi-icon-size-${name}`]
  return typeof value === 'string' ? value : name
}

export default getIconSizeValue

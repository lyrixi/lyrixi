import variables from './variables'
import type { FontColor } from './types'

// 解析文字颜色：命中 token 返回变量值，否则返回原值
function getColorValue(name?: FontColor | string): string | undefined {
  if (!name) {
    return undefined
  }

  const value = variables[`lyrixi-color-${name}`]
  return typeof value === 'string' ? value : name
}

export default getColorValue

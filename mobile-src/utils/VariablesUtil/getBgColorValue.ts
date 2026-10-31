import variables from './variables'
import type { BackgroundColor } from './types'

// 解析背景色：命中 token 返回变量值，否则返回原值
function getBgColorValue(name?: BackgroundColor | string): string | undefined {
  if (!name) {
    return undefined
  }

  const bgValue = variables[`lyrixi-bg-${name}`]
  if (typeof bgValue === 'string') {
    return bgValue
  }

  const colorValue = variables[`lyrixi-color-${name}`]
  return typeof colorValue === 'string' ? colorValue : name
}

export default getBgColorValue

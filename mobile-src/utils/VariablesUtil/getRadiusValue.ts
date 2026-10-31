import variables from './variables'
import type { Radius } from './types'

// 解析圆角：仅 string 查 token；非 string（如 number）原样返回
function getRadiusValue(name?: Radius | string | number): string | number | undefined {
  if (!name || typeof name !== 'string') {
    return name
  }

  // less 无 xxs，兼容旧调用指向 xs
  const token = name === 'xxs' ? 'xs' : name
  const value = variables[`lyrixi-radius-${token}`]
  return typeof value === 'string' ? value : name
}

export default getRadiusValue

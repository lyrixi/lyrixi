import type { DataUtilDesensitizeParams } from './types'

/**
 * 按 [start, end) 区间将字符串替换为 `*`，区间语义与 `String.slice` 一致。
 * @param value 原始字符串
 * @param params.start 脱敏起始下标（含）
 * @param params.end 脱敏结束下标（不含）
 */
function desensitize(value: string, params: DataUtilDesensitizeParams): string {
  if (typeof value !== 'string' || value === '') {
    return typeof value === 'string' ? value : ''
  }

  const start = params?.start
  const end = params?.end
  if (typeof start !== 'number' || typeof end !== 'number') {
    return value
  }
  if (Number.isNaN(start) || Number.isNaN(end)) {
    return value
  }

  const startIndex = Math.max(0, Math.floor(start))
  const endIndex = Math.min(value.length, Math.floor(end))
  if (startIndex >= endIndex) {
    return value
  }

  const masked = '*'.repeat(endIndex - startIndex)
  return `${value.slice(0, startIndex)}${masked}${value.slice(endIndex)}`
}

export default desensitize

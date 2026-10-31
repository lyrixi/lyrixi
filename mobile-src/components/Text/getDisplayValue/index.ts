import type { TextGetDisplayValueParams } from './../types'

// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

// 获取显示名称
function getDisplayValue(value: unknown, params: TextGetDisplayValueParams = {}): string {
  const { maxCount, precision } = params
  // Date
  if (value instanceof Date) {
    return DateUtil.format(value, 'YYYY-MM-DD')
  }

  // Array
  if (Array.isArray(value)) {
    // Date Range
    if (value.length === 2 && value[0] instanceof Date && value[1] instanceof Date) {
      return `${DateUtil.format(value[0], 'YYYY-MM-DD')} ~ ${DateUtil.format(
        value[1],
        'YYYY-MM-DD'
      )}`
    }

    // Select
    let displayValue: (string | number)[] = value.map((item) => {
      if (item instanceof Date) {
        return DateUtil.format(item, 'YYYY-MM-DD')
      } else if (typeof item === 'object' && item !== null) {
        return ((item as Record<string, unknown>).name as string) || ''
      }
      return item as string | number
    })
    let count = value.length
    if (maxCount && count > maxCount) {
      displayValue = displayValue.splice(0, maxCount)
      return `${displayValue.join(',')}+${count}`
    }
    return displayValue.join(',')
  }

  // Object
  if (value && typeof value === 'object') {
    const name = (value as Record<string, unknown>).name
    return String(name)
  }

  // Base type
  if (typeof value !== 'string' && typeof value !== 'number') {
    return ''
  }

  // Fixed number
  if (typeof precision === 'number' && typeof value === 'number') {
    return Number(value).toFixed(precision)
  }

  return String(value)
}

export default getDisplayValue

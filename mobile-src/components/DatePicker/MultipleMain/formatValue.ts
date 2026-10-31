import type { DatePickerMultipleValue, DatePickerPickerType } from './../types'

// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

// Format value
function formatValue(value: unknown, type: DatePickerPickerType | string): DatePickerMultipleValue {
  if (!Array.isArray(value) || !value.length) {
    return null
  }
  return value.map((tab) => {
    const t = tab as { value?: Date; [k: string]: unknown }
    let date = t.value instanceof Date ? t.value : new Date()
    return {
      ...t,
      value: date,
      name: DateUtil.format(date, type)
    }
  })
}

export default formatValue

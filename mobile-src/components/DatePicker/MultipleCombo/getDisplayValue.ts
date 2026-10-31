import type { DatePickerPickerType } from './../types'

// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

// 显示多选名称
function getMultipleDisplayValue({
  type,
  value,
  separator
}: {
  type?: DatePickerPickerType | string
  value?: unknown
  separator?: string
}) {
  if (!Array.isArray(value) || value.length < 2) {
    return ''
  }

  let displayValue: string[] = []
  for (let current of value) {
    if (
      !current ||
      typeof current !== 'object' ||
      !('value' in current) ||
      (current as { value?: unknown }).value instanceof Date === false
    ) {
      return ''
    }
    displayValue.push(DateUtil.format((current as { value: Date }).value, type ?? 'date'))
  }

  return displayValue.join(separator || ' ~ ')
}

export default getMultipleDisplayValue

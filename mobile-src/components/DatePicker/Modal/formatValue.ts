import valueToList from '../Main/DateMain/valueToList'
import listToValue from '../Main/DateMain/listToValue'

import type { DatePickerPickerType } from './../types'

// 格式化value, 过滤不合法的值
function formatValue(
  value: Date | null | undefined,
  type: DatePickerPickerType,
  { hourStep, minuteStep }: { hourStep?: number; minuteStep?: number }
): Date | null {
  if (value instanceof Date === false) {
    // eslint-disable-next-line
    value = new Date()
  }

  let valueList = valueToList(value, type, { hourStep, minuteStep })
  if (!valueList) return null

  return listToValue(valueList, type)
}

export default formatValue

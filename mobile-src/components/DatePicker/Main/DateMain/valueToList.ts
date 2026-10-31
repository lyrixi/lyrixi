// 内库使用-start
import DateUtil from './../../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

import type { DatePickerPickerType, DatePickerPickerValueList } from './../../types'

// 将 currentValue 取到 step 网格上最近的合法值（与 getList 中选项一致）
function getValueStepTime(currentValue: number, step: number, maxValue: number): number {
  if (!step || typeof step !== 'number') {
    return currentValue
  }
  let rounded = Math.round(currentValue / step) * step
  if (rounded > maxValue) {
    rounded = Math.floor(maxValue / step) * step
  }
  if (rounded < 0) {
    rounded = 0
  }
  return rounded
}

// 日期转列表
function valueToList(
  value: Date | null | undefined,
  type: DatePickerPickerType,
  options: { hourStep?: number; minuteStep?: number }
): DatePickerPickerValueList | null {
  const currentDate: Date = value instanceof Date ? value : new Date()

  let year = currentDate.getFullYear()
  let month = currentDate.getMonth() + 1
  let date = currentDate.getDate()
  let hour = currentDate.getHours()
  let minute = currentDate.getMinutes()
  let quarter = DateUtil.quarter(currentDate) ?? 1

  hour = getValueStepTime(hour, options?.hourStep ?? 1, 23)
  minute = getValueStepTime(minute, options?.minuteStep ?? 1, 59)

  if (type === 'year') {
    return [{ id: year, name: year }]
  }
  if (type === 'quarter') {
    return [
      { id: year, name: year },
      { id: quarter, name: 'Q' + quarter }
    ]
  }
  if (type === 'month') {
    return [
      { id: year, name: year },
      { id: month, name: month }
    ]
  }
  if (type === 'date') {
    return [
      { id: year, name: year },
      { id: month, name: month },
      { id: date, name: date }
    ]
  }
  if (type === 'datetime') {
    return [
      { id: year, name: year },
      { id: month, name: month },
      { id: date, name: date },
      { id: hour, name: hour },
      { id: minute, name: minute }
    ]
  }
  if (type === 'time') {
    return [
      { id: hour, name: hour },
      { id: minute, name: minute }
    ]
  }

  return null
}

export default valueToList

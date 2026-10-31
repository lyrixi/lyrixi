import type { CalendarValue } from '../types'

// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

// Range value, sort two date
function sortRangeValue(newDate: Date, value: CalendarValue): Date[] {
  if (!Array.isArray(value) || value.length !== 2) {
    return [newDate, newDate]
  }
  const v0 = value[0] as Date
  const v1 = value[1] as Date

  if (DateUtil.compare(v0, v1, 'date') === 0) {
    let newValue: Date[] = [v0, newDate]
    if (DateUtil.compare(v0, newDate, 'date') === -1) {
      newValue = [newDate, v0]
    }
    return newValue
  }

  return [newDate, newDate]
}

export default sortRangeValue

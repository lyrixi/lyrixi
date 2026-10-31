import dayjs from 'dayjs'
import type { OpUnitType } from 'dayjs'

// 边界时间: 00:00:00或23:59:59
function startOrEnd(date: Date, type: string, boundary = 'start') {
  if (boundary === 'start') {
    if (['year', 'quarter', 'month'].includes(type)) {
      return dayjs(date)
        .startOf(type as OpUnitType)
        .toDate()
    }
    if (type === 'week') {
      return dayjs(date)
        .startOf('isoWeek' as OpUnitType)
        .toDate()
    }
    if (type === 'date') {
      return dayjs(date).startOf('day').toDate()
    }
    if (type === 'datetime') {
      date.setSeconds(0)
      return date
    }
    return date
  }

  if (boundary === 'end') {
    if (['year', 'quarter', 'month'].includes(type)) {
      return dayjs(date)
        .endOf(type as OpUnitType)
        .toDate()
    }
    if (type === 'week') {
      return dayjs(date)
        .endOf('isoWeek' as OpUnitType)
        .toDate()
    }
    if (type === 'date') {
      return dayjs(date).endOf('day').toDate()
    }
    if (type === 'datetime') {
      date.setSeconds(59)
      return date
    }
    return date
  }

  return date
}

export default startOrEnd

import getWeekNames from './getWeekNames'

import type { CalendarCellDate } from '../../types'

// 内库使用-start
import DateUtil from './../../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

// 获得上周日历
function getPreviousWeekDates(currentDate: Date, weekStart: string) {
  const date = DateUtil.previousWeek(new Date(currentDate))
  return DateUtil.getWeekDates(date, weekStart) as CalendarCellDate[]
}
// 获得下周日历
function getNextWeekDates(currentDate: Date, weekStart: string) {
  const date = DateUtil.nextWeek(new Date(currentDate))
  return DateUtil.getWeekDates(date, weekStart) as CalendarCellDate[]
}

// 周数据: 上周和下周共14天
function getWeeks(currentDate: Date | null, { weekStart }: { weekStart: string }) {
  if (!currentDate) {
    return null
  }
  return {
    previous: getPreviousWeekDates(currentDate, weekStart),
    next: getNextWeekDates(currentDate, weekStart)
  }
}

const Weeks = {
  getWeekNames,
  getWeeks
}

export default Weeks

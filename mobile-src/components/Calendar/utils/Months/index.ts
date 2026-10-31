import getDateRowIndex from './getDateRowIndex'
import paginateMonths from './paginateMonths'

import type { CalendarCellDate } from '../../types'

// 内库使用-start
import DateUtil from './../../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

// 获得上月日历
function getPrevMonthData(currentDate: Date, weekStart: string) {
  const date = DateUtil.previousMonth(new Date(currentDate))
  return DateUtil.getMonthDates(date, weekStart) as CalendarCellDate[][]
}
// 获得下月日历
function getNextMonthData(currentDate: Date, weekStart: string) {
  const date = DateUtil.nextMonth(new Date(currentDate))
  return DateUtil.getMonthDates(date, weekStart) as CalendarCellDate[][]
}

// 获取三个月的日历数据, 每个月渲染42格, 共126格
function getMonths(currentDate: Date | null, { weekStart }: { weekStart: string }) {
  if (!currentDate) {
    return null
  }

  const data = {
    previous: getPrevMonthData(currentDate, weekStart),
    current: DateUtil.getMonthDates(currentDate, weekStart) as CalendarCellDate[][],
    next: getNextMonthData(currentDate, weekStart)
  }

  return data
}

const Months = {
  previousMonth: DateUtil.previousMonth,
  nextMonth: DateUtil.nextMonth,
  getDateRowIndex,
  getMonthDates: DateUtil.getMonthDates,
  getMonths,
  paginateMonths
}

export default Months

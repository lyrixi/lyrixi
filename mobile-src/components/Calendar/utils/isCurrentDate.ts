import type { CalendarCellDate } from '../types'

// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

// 判断绘制日期是否在当前显示的页当中
function isCurrentDate(
  drawDate: Date | null,
  currentPage: CalendarCellDate[][] | undefined | null
): boolean {
  if (drawDate === null || !currentPage || !Array.isArray(currentPage)) {
    return false
  }

  for (const row of currentPage) {
    if (!Array.isArray(row)) {
      continue
    }

    for (const date of row) {
      if (date instanceof Date) {
        if (DateUtil.compare(drawDate, date, 'month') === 0) {
          return !!(date as CalendarCellDate).isCurrent
        }
      }
    }
  }

  return false
}

export default isCurrentDate

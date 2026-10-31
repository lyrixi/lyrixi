import type { CalendarCellDate } from '../../types'

// 内库使用-start
import DateUtil from './../../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

// 获取日期所在行
function getDateRowIndex(currentDate: Date, currentPage: CalendarCellDate[][] | null | undefined) {
  if (!currentPage || !Array.isArray(currentPage)) {
    return 0
  }
  for (let rowIndex = 0; rowIndex < currentPage.length; rowIndex++) {
    const row = currentPage[rowIndex]
    if (!Array.isArray(row)) {
      continue
    }

    for (const date of row) {
      if (date instanceof Date) {
        if (DateUtil.compare(currentDate, date, 'date') === 0) {
          return rowIndex
        }
      }
    }
  }

  return 0
}

export default getDateRowIndex

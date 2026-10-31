import Weeks from './../Weeks'
import getDateRowIndex from './getDateRowIndex'
import type { CalendarCellDate, CalendarType } from '../../types'

// 方便渲染, 三维化months数组：3页6行7列
function paginateMonths(
  months: {
    previous: CalendarCellDate[][]
    current: CalendarCellDate[][]
    next: CalendarCellDate[][]
  } | null,
  { weekStart, drawDate, type }: { weekStart: string; drawDate: Date; type: CalendarType | null }
) {
  if (!drawDate || !months) {
    return [] as CalendarCellDate[][][]
  }

  // 共3页，每页6行, 第行7个日期
  const pages: CalendarCellDate[][][] = [months.previous, months.current, months.next]

  // 周需要替换同行上周和下周的数据
  if (type === 'week') {
    const drawDateRowIndex = getDateRowIndex(drawDate, months.current)

    const weekDates = Weeks.getWeeks(drawDate, { weekStart })

    for (let idx = 0; idx < pages.length; idx++) {
      if (idx === 1) {
        continue
      }
      const page = pages[idx]
      if (weekDates === null) {
        continue
      }
      for (let rowIndex = 0; rowIndex < page.length; rowIndex++) {
        if (rowIndex === drawDateRowIndex) {
          if (idx === 0) {
            page[rowIndex] = weekDates.previous
          } else if (idx === 2) {
            page[rowIndex] = weekDates.next
          }
        }
      }
    }
  }

  return pages
}

export default paginateMonths

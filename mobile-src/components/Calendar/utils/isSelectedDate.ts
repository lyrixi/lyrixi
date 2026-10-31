import type { CalendarSelectionMode, CalendarValue } from '../types'

// 内库使用-start
import DateUtil from '../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

// 当前日期是否选中, 空:未选中 数组:[selected:选中 selected-start:开始 selected-end:结束]
function isSelectedDate(
  date: Date,
  selected: CalendarValue,
  selectionMode: CalendarSelectionMode
): string[] | null {
  if (Array.isArray(selected)) {
    if (selectionMode === 'range' && selected.length === 2) {
      const start = selected[0] as Date
      const end = selected[1] as Date
      const isSelected: string[] = []
      const vs = DateUtil.compare(date, start, 'date') ?? 0
      const ve = DateUtil.compare(date, end, 'date') ?? 0
      if (vs >= 0 && ve <= 0) {
        isSelected.push('lyrixi-selected')
      }
      if (vs === 0) {
        isSelected.push('lyrixi-selected-start')
      }
      if (ve === 0) {
        isSelected.push('lyrixi-selected-end')
      }
      if (isSelected.length) {
        return isSelected
      }
      return null
    }
    if (
      selectionMode === 'multiple' &&
      selected.some(
        (selectedDate) => selectedDate && DateUtil.compare(date, selectedDate, 'date') === 0
      )
    ) {
      return ['lyrixi-selected']
    }
    return null
  }

  if (!(selected instanceof Date)) {
    return null
  }

  if (DateUtil.compare(date, selected, 'date') === 0) {
    return ['lyrixi-selected']
  }

  return null
}

export default isSelectedDate

import getDefaultRangeId from './getDefaultRangeId'
import type { DatePickerRangesMap } from './../../types'

// 内库使用-start
import DateUtil from './../../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

// Expose: Get RangeId
function getRangeId(
  value: (Date | null)[] | null | undefined,
  { type, rangeId, ranges }: { type: string; rangeId?: string | null; ranges?: DatePickerRangesMap }
) {
  if (!ranges) {
    return ''
  }
  if (rangeId) {
    const rangeDates = (ranges as Record<string, [Date, Date] | unknown>)[rangeId]
    // 自定义项
    if (!Array.isArray(rangeDates)) {
      return rangeId
    }
    // 非自定义项
    if (
      value &&
      value.length === 2 &&
      DateUtil.compare(value[0] as Date, (rangeDates as [Date, Date])?.[0], type) === 0 &&
      DateUtil.compare(value[1] as Date, (rangeDates as [Date, Date])?.[1], type) === 0
    ) {
      return rangeId
    }
  }

  // rangeId未匹配成功, 则显示默认别名
  const defaultRangeId = getDefaultRangeId(value, ranges, type)
  if (defaultRangeId) {
    return defaultRangeId
  }

  return ''
}

export default getRangeId

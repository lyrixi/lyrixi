import type { DatePickerRangesMap } from './../../types'

// 内库使用-start
import DateUtil from './../../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

function getDefaultRangeId(
  value: (Date | null)[] | null | undefined,
  ranges: DatePickerRangesMap,
  type: string
): string | null {
  if (!Array.isArray(value) || value.length !== 2) {
    return null
  }

  if (toString.call(ranges) !== '[object Object]') {
    return null
  }

  const activeIds: string[] = []
  let customId = ''
  const r = ranges as Record<string, [Date, Date] | unknown>
  for (let id in r) {
    if (!Array.isArray(r[id])) {
      customId = id
    }

    const rangePair = r[id] as [Date, Date] | undefined
    if (
      rangePair &&
      rangePair.length === 2 &&
      value[0] &&
      value[1] &&
      rangePair[0] instanceof Date &&
      rangePair[1] instanceof Date &&
      DateUtil.format(rangePair[0], type) === DateUtil.format(value[0], type) &&
      DateUtil.format(rangePair[1], type) === DateUtil.format(value[1], type)
    ) {
      activeIds.push(id)
    }
  }

  if (!activeIds.length) {
    return customId
  }

  return activeIds[0]
}

export default getDefaultRangeId

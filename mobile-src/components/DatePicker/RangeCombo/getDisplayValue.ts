import type { DatePickerRangesMap } from './../types'

// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

// 显示名称(共用方法)
function getDisplayValue({
  value,
  type,
  rangeId,
  ranges,
  separator
}: {
  value: (Date | null)[] | null | undefined
  type?: string
  rangeId?: string | null
  ranges?: DatePickerRangesMap
  separator?: string
}) {
  if (!Array.isArray(value) || value.length !== 2) {
    return ''
  }

  const v0 = value[0]
  const v1 = value[1]
  if (!v0 || !v1) {
    return ''
  }

  const t = type ?? 'date'

  // 显示别名
  if (rangeId) {
    // 正确的别名
    if (
      ranges &&
      rangeId in ranges &&
      Array.isArray((ranges as Record<string, unknown>)[rangeId])
    ) {
      return rangeId
    }

    // 自定义别名
    return `${DateUtil.format(v0, t)} ${separator || ' ~ '} ${DateUtil.format(v1, t)}`
  }

  // 显示自定义日期
  return `${DateUtil.format(v0, t)} ${separator || ' ~ '} ${DateUtil.format(v1, t)}`
}

export default getDisplayValue

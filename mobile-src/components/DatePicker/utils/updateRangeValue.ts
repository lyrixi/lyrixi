// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

// 边界处理: 00:00:00到23:59:59; 开始日期小于结束日期, 则交换位置
function updateRangeValue(
  rangeDates: unknown[] = [],
  type: string,
  { autoSwapValue }: { autoSwapValue?: boolean } = {}
): ((Date | null)[] | null) | null {
  if (!Array.isArray(rangeDates) || rangeDates.length !== 2) {
    return null
  }
  const [startDate, endDate] = rangeDates
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    return rangeDates as (Date | null)[]
  }

  const adjustStart = (date: Date) => {
    return DateUtil.startOrEnd(date, type, 'start')
  }
  const adjustEnd = (date: Date) => {
    return DateUtil.startOrEnd(date, type, 'end')
  }

  // endDate greater than startDate, transposition
  if (
    autoSwapValue &&
    DateUtil.startOrEnd(endDate, type).getTime() < DateUtil.startOrEnd(startDate, type).getTime()
  ) {
    return [adjustStart(endDate), adjustEnd(startDate)]
  }

  // startDate greater than endDate
  return [adjustStart(startDate), adjustEnd(endDate)]
}

export default updateRangeValue

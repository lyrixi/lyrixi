// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

function getDefaultDateValue({ min, max }: { min?: Date | null; max?: Date | null }): Date {
  const now = new Date()

  if (min !== null && min !== undefined) {
    const cmpMin = DateUtil.compare(now, min, 'date')
    if (cmpMin !== undefined && cmpMin < 0) {
      return min
    }
  }
  if (max !== null && max !== undefined) {
    const cmpMax = DateUtil.compare(now, max, 'date')
    if (cmpMax !== undefined && cmpMax > 0) {
      return max
    }
  }
  return now
}

export default getDefaultDateValue

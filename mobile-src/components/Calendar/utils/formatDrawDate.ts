import isDisabledDate from './isDisabledDate'
import type { CalendarValue } from '../types'

// 获取当前绘制日期
function formatDrawDate(newValue: CalendarValue, { min, max }: { min?: Date; max?: Date }): Date {
  let newDrawDate: Date | undefined
  if (Array.isArray(newValue)) {
    const last = newValue[newValue.length - 1]
    newDrawDate = last instanceof Date ? last : undefined
  } else if (newValue instanceof Date) {
    newDrawDate = newValue
  }

  if (newDrawDate === null || newDrawDate === undefined || !(newDrawDate instanceof Date)) {
    newDrawDate = new Date()
  }

  // 访问禁止日期
  const err = isDisabledDate(newDrawDate, { min, max })
  if (err !== false) {
    // eslint-disable-next-line no-console
    console.log(err.message)
    return err.date
  }

  return newDrawDate
}

export default formatDrawDate

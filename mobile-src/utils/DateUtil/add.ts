import dayjs from 'dayjs'
import type { ManipulateType } from 'dayjs'

// type: 'year|quarter|month|week|date|day|hour|minute|second'
function add(date: Date | string | number, count: number, type: string = 'date'): Date {
  if (count === 0 || typeof count !== 'number') {
    return dayjs(date).toDate()
  }

  const unit: ManipulateType = (type === 'date' ? 'day' : type) as ManipulateType

  if (count > 0) {
    return dayjs(date).add(count, unit).toDate()
  }

  return dayjs(date).subtract(Math.abs(count), unit).toDate()
}

export default add

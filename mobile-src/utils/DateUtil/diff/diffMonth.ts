import dayjs from 'dayjs'

function diffMonth(d1: Date, d2: Date) {
  return dayjs(d1).diff(dayjs(d2), 'month')
}

export default diffMonth

import dayjs from 'dayjs'

function diffHour(d1: Date, d2: Date) {
  return dayjs(d1).diff(dayjs(d2), 'hour')
}

export default diffHour

import dayjs from 'dayjs'

function diffDate(d1: Date, d2: Date) {
  return dayjs(d1).diff(dayjs(d2), 'day')
}

export default diffDate

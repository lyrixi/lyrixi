import dayjs from 'dayjs'

function diffYear(d1: Date, d2: Date) {
  return dayjs(d1).diff(dayjs(d2), 'year')
}

export default diffYear

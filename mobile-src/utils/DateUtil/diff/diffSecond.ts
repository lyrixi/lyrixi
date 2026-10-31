import dayjs from 'dayjs'

function diffSecond(d1: Date, d2: Date) {
  return dayjs(d1).diff(dayjs(d2), 'second')
}

export default diffSecond

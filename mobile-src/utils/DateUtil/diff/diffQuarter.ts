import dayjs from 'dayjs'

function diffQuarter(d1: Date, d2: Date) {
  return dayjs(d1).diff(dayjs(d2), 'quarter')
}

export default diffQuarter

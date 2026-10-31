import dayjs from 'dayjs'

function diffMinute(d1: Date, d2: Date) {
  return dayjs(d1).diff(dayjs(d2), 'minute')
}

export default diffMinute

import dayjs from 'dayjs'

// 转为日期格式
function toDate(date: Date | string | number | null | undefined) {
  if (!date) return null

  // If date is time, convert to date with current date
  if (typeof date === 'string' && /^(\d{1,2}:\d{2})(:\d{2})?$/.test(date)) {
    return dayjs(`${dayjs().format('YYYY-MM-DD')} ${date}`).toDate()
  }
  return dayjs(date).toDate()
}

export default toDate

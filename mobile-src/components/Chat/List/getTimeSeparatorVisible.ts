// 判断当前时间与上一次分隔时间是否超过 timeSeparator，是否展示时间分隔
function getTimeSeparatorVisible(
  date: Date,
  previousDate: Date | null | undefined,
  timeSeparator: number
): boolean {
  if (date instanceof Date === false) {
    return false
  }

  if (!previousDate) {
    return true
  }

  return Math.abs(date.getTime() - previousDate.getTime()) > timeSeparator
}

export default getTimeSeparatorVisible

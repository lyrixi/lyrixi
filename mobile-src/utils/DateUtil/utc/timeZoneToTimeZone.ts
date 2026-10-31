// 在两个时区间转换
function timeZoneToTimeZone(timeZoneDate: Date, fromOffset: number, toOffset: number) {
  if (!(timeZoneDate instanceof Date) || Number.isNaN(timeZoneDate.getTime())) {
    return null
  }

  if (typeof fromOffset !== 'number' || typeof toOffset !== 'number') {
    return timeZoneDate
  }

  const offsetDiff = toOffset - fromOffset

  const result = new Date(timeZoneDate.getTime())
  result.setMinutes(result.getMinutes() + offsetDiff)

  return result
}

export default timeZoneToTimeZone

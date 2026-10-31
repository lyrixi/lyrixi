// 时区字符串化，入参: 总分钟数, 返回: "UTC+08:00"
function stringifyUtcOffset(utcOffset: number) {
  // 正向或反向偏移
  const sign = utcOffset >= 0 ? '+' : '-'

  // 毫秒数转成时分
  const totalMinutes = utcOffset
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  // 格式化输出（若分钟为0则省略）UTC+08:00
  return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}
export default stringifyUtcOffset

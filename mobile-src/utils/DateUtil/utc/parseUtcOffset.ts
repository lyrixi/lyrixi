// 解析UTC偏移量, 入参:"UTC+08:00", 返回: 总分钟数
function parseUtcOffset(utcDescription: string) {
  const match = /^UTC([+-])(\d{2}):(\d{2})$/.exec(utcDescription)
  if (!match) {
    return null
  }
  const sign = match[1] === '+' ? 1 : -1
  const hours = parseInt(match[2], 10)
  const minutes = parseInt(match[3], 10)
  return sign * (hours * 60 + minutes)
}

export default parseUtcOffset

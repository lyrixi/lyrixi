// 时区方法: 将指定时区时间转为 UTC, 入参: "日期, 时区偏移总分钟数", 返回: "UTC日期"
function timeZoneToUtc(utcDate: Date, offset: number) {
  // 检查参数
  if (!(utcDate instanceof Date) || Number.isNaN(utcDate.getTime())) {
    return null
  }

  if (typeof offset !== 'number') {
    return utcDate
  }

  // 复制原 date，避免修改原始对象
  const result = new Date(utcDate.getTime())

  // 调整时间
  result.setMinutes(result.getMinutes() - offset)

  return result
}

export default timeZoneToUtc

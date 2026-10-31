// 矫正最大长度与小数位
function maxLengthFormatter(val: string, { maxLength }: { maxLength?: number }): string {
  // 最大长度
  if (maxLength && val && val.length > maxLength) {
    // eslint-disable-next-line
    val = val.substring(0, maxLength)
  }
  return val
}

export default maxLengthFormatter

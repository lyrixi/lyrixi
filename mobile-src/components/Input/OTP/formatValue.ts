/**
 * 校正 OTP 组件的 value 格式
 * 要求必须每项都是字符串，数值强转字符串，其它类型都返回空，长度大于maxLength的截取
 * @param {unknown[]} value - 输入值
 * @param {number} maxLength - 最大长度
 * @returns {string[]} 格式化后的字符串数组
 */
function formatValue(value: unknown[], maxLength: number = 6): string[] {
  let values: string[] = Array(maxLength).fill('')
  if (!Array.isArray(value)) {
    return values
  }

  for (let i = 0; i < values.length; i++) {
    if (typeof value[i] === 'string') {
      values[i] = value[i] as string
    } else if (typeof value[i] === 'number') {
      values[i] = String(value[i])
    }
  }

  return values
}

export default formatValue

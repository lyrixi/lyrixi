/**
 * 公用方法, 用于判断是否允许清除/删除
 * @param {boolean|function} allowClear - 是否允许清除（布尔值或函数）
 * @param {object} item - 当前项数据
 * @returns {boolean} 是否允许清除
 */
function isAllowClear(
  allowClear: boolean | ((item: Record<string, unknown>) => boolean) | undefined,
  item: Record<string, unknown>
) {
  // 如果 allowClear 是函数，调用函数判断
  if (typeof allowClear === 'function') {
    return allowClear(item)
  }

  // 如果 allowClear 是布尔值，直接返回
  return Boolean(allowClear)
}

export default isAllowClear

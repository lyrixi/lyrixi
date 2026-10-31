import compare from './compare'

/**
 * 比较两个时间段范围是否包含
 * @param {*} range1 [startDate, endDate], 均为 Date 类型
 * @param {*} range2 [startDate, endDate], 均为 Date 类型
 * @param {*} compareUnit
 * @returns 若range1等于range2则返回0，若range1包含range2则返回1，若range1不包含range2则返回-1
 */

function compareRange(
  range1: [Date, Date],
  range2: [Date, Date],
  compareUnit: string
): -1 | 0 | 1 | undefined {
  if (
    !Array.isArray(range1) ||
    !Array.isArray(range2) ||
    range1.length !== 2 ||
    range2.length !== 2 ||
    !(range1[0] instanceof Date) ||
    !(range1[1] instanceof Date) ||
    !(range2[0] instanceof Date) ||
    !(range2[1] instanceof Date)
  ) {
    return undefined
  }

  let [start1, end1] = range1
  let [start2, end2] = range2

  // 格式化range1和range2：若起止顺序颠倒，则交换
  if (start1.getTime() > end1.getTime()) {
    const tmp = start1
    start1 = end1
    end1 = tmp
  }
  if (start2.getTime() > end2.getTime()) {
    const tmp = start2
    start2 = end2
    end2 = tmp
  }

  // 比较范围
  const startCompare = compare(start1, start2, compareUnit)
  const endCompare = compare(end1, end2, compareUnit)
  if (startCompare === undefined || endCompare === undefined) return undefined

  // 相等
  if (startCompare === 0 && endCompare === 0) return 0

  // 包含
  if ((startCompare === 0 || startCompare === -1) && (endCompare === 0 || endCompare === 1))
    return 1

  // 不包含
  return -1
}

export default compareRange

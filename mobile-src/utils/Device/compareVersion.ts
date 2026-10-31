/**
 * 比较版本号
 * @param {String} v1 - 版本号1
 * @param {String} v2 - 版本号2
 * @param {String} separator - 分隔符，默认为 '.'
 * @returns {Number} -1: v1小于v2, 0: v1等于v2, 1: v1大于v2
 */
function compareVersion(v1: string, v2: string, separator = '.'): -1 | 0 | 1 {
  // Comaptiable with IOS version
  if (v1.indexOf(separator) === -1 && v1.indexOf('_') !== -1) {
    // eslint-disable-next-line
    v1 = v1.replace(/_/gim, separator)
  }
  if (v2.indexOf(separator) === -1 && v2.indexOf('_') !== -1) {
    // eslint-disable-next-line
    v2 = v2.replace(/_/gim, separator)
  }

  const v1Parts = v1.split(separator).map(Number)
  const v2Parts = v2.split(separator).map(Number)

  const length = Math.max(v1Parts.length, v2Parts.length)

  for (let i = 0; i < length; i++) {
    const part1 = v1Parts[i] || 0 // 如果没有该部分，默认为0
    const part2 = v2Parts[i] || 0 // 如果没有该部分，默认为0

    if (part1 < part2) return -1
    if (part1 > part2) return 1
  }

  return 0 // 如果所有部分都相等
}

export default compareVersion

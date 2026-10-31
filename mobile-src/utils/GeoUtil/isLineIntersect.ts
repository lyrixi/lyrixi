import type { Line } from './types'

/**
 * 判断两条线是否相交
 * @param {Line} line0 起点终点
 * @param {Line} line1 起点终点
 * @return {Boolean}
 */
function isLineIntersect(line0: Line, line1: Line): boolean {
  if (line0.length !== 2) return false
  if (line1.length !== 2) return false

  const a = line0[0].longitude ?? 0
  const b = line0[0].latitude ?? 0
  const c = line0[1].longitude ?? 0
  const d = line0[1].latitude ?? 0

  const p = line1[0].longitude ?? 0
  const q = line1[0].latitude ?? 0
  const r = line1[1].longitude ?? 0
  const s = line1[1].latitude ?? 0

  let det, gamma, lambda
  det = (c - a) * (s - q) - (r - p) * (d - b)
  if (det === 0) {
    return false
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det
    return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1
  }
}

export default isLineIntersect

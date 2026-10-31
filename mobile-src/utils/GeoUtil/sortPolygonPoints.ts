import type { MapPoint } from '../../components/Map/types/Map.common.types'

function toPointTuple(point: MapPoint): [number, number] {
  return [point.longitude ?? 0, point.latitude ?? 0]
}

function cross(pivot: MapPoint, a: MapPoint, b: MapPoint): number {
  const [px, py] = toPointTuple(pivot)
  const [ax, ay] = toPointTuple(a)
  const [bx, by] = toPointTuple(b)
  return (ax - px) * (by - py) - (ay - py) * (bx - px)
}

function distSqFrom(pivot: MapPoint, point: MapPoint): number {
  const [px, py] = toPointTuple(pivot)
  const [x, y] = toPointTuple(point)
  const dx = x - px
  const dy = y - py
  return dx * dx + dy * dy
}

function compareByPolarAngle(pivot: MapPoint, a: MapPoint, b: MapPoint): number {
  const crossVal = cross(pivot, a, b)
  if (crossVal !== 0) {
    return crossVal > 0 ? -1 : 1
  }
  return distSqFrom(pivot, a) - distSqFrom(pivot, b)
}

function findStartPoint(points: MapPoint[]): MapPoint {
  return points.reduce((start, point) => {
    const [sx, sy] = toPointTuple(start)
    const [x, y] = toPointTuple(point)
    if (y < sy || (y === sy && x < sx)) {
      return point
    }
    return start
  })
}

function isExactSamePoint(a: MapPoint, b: MapPoint): boolean {
  const [ax, ay] = toPointTuple(a)
  const [bx, by] = toPointTuple(b)
  return ax === bx && ay === by
}

/**
 * 将多边形顶点按逆时针排序。
 *
 * 以最低纬度、同纬度最低经度的点为起点，
 * 按相对于起点的极角逆时针排列其余顶点。
 *
 * 适用于凸多边形顶点重排，可避免因顶点顺序错乱
 * 导致 Polygon 绘制时产生边线交叉。
 */
function sortPolygonPoints(points: MapPoint[]): MapPoint[] {
  if (points.length <= 2) {
    return points.map((point) => ({ ...point }))
  }

  const copied = points.map((point) => ({ ...point }))
  const start = findStartPoint(copied)
  const rest = copied.filter((point) => !isExactSamePoint(point, start))
  rest.sort((a, b) => compareByPolarAngle(start, a, b))

  return [start, ...rest]
}

export default sortPolygonPoints

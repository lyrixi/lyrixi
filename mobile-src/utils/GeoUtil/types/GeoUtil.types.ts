// GeoUtil 统一使用地图通用坐标点 MapPoint（{ longitude, latitude }）
// 直接引用 Map.common.types，避免与 Map/types 入口互相依赖，也不在此重复导出 MapPoint
import type { MapPoint } from '../../../components/Map/types/Map.common.types'

// 线段，由起点和终点两个坐标点组成
export type Line = [MapPoint, MapPoint]

// GeoUtil 实例类型（供内部自引用与导出）
export interface GeoUtilType {
  polygonToLines: (polygon: MapPoint[], isRegular?: boolean) => Line[]
  isPointInsidePolygon: (point: MapPoint, polygon: MapPoint[]) => boolean
  isLineIntersect: (line0: Line, line1: Line) => boolean
  isPolygonInsidePolygon: (py0: MapPoint[], py1: MapPoint[]) => boolean
  isPoint: (
    point: MapPoint | null | undefined
  ) => point is MapPoint & { longitude: number | null; latitude: number | null }
  getMiddlePoint: (p0: MapPoint, p1: MapPoint) => MapPoint
  isPolygon: (polygon: MapPoint[]) => boolean
  isPointOnLine: (point: MapPoint, line: Line) => boolean
  getDistance: (p0: MapPoint, p1: MapPoint) => number | null
  sortPolygonPoints: (points: MapPoint[]) => MapPoint[]
  transformPoint: (point: MapPoint, from: string, to: string) => MapPoint | null
  transformPoints: (
    points: MapPoint[] | undefined,
    from?: string,
    to?: string
  ) => Array<MapPoint | null> | undefined
  isInChina: (point: MapPoint) => boolean | null
  isSamePoint: (
    pointA: MapPoint | null | undefined,
    pointB: MapPoint | null | undefined,
    distance?: number
  ) => boolean
}

import transformPoint from './transformPoint'
import type { MapPoint } from '../../components/Map/types/Map.common.types'

/**
 * 坐标转换（批量）
 * @param {Array<MapPoint>} points 点数组
 * @param {String} from 原始坐标类型 'wgs84 | gcj02 | bd09'
 * @param {String} to 转换坐标类型 'wgs84 | gcj02 | bd09'
 * @return {Array<MapPoint | null>} 错误返回null
 */
function transformPoints(
  points: MapPoint[] | undefined,
  from = 'gcj02',
  to = 'bd09'
): Array<MapPoint | null> | undefined {
  if (!points || !points.length) {
    console.log('GeoUtil transformPoints: points参数为空')
    return points
  }
  if (
    !points[0] ||
    points[0].longitude === null ||
    points[0].longitude === undefined ||
    points[0].latitude === null ||
    points[0].latitude === undefined
  ) {
    console.log('GeoUtil transformPoints: points参数不正确, 应当传入[{ latitude, longitude }, ...]')
    return points
  }
  if (from === to) return points
  if (!from) return points
  if (!to) return points
  return points.map((point) => {
    return transformPoint(point, from, to)
  })
}

export default transformPoints

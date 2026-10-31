import type { MapPoint } from '../../components/Map/types/Map.common.types'

/**
 * 判断是否在国内，不在国内则不做偏移
 * @param point
 * @returns {boolean}
 */
function isInChina(point: MapPoint): boolean | null {
  // 检查参数是否有效
  if (
    !point ||
    point.longitude === null ||
    point.longitude === undefined ||
    point.latitude === null ||
    point.latitude === undefined
  ) {
    console.error('请输入有效的经纬度数值')
    return null
  }
  const longitude = Number(point.longitude)
  const latitude = Number(point.latitude)

  // 中国的经纬度范围
  const CHINA_LATITUDE_MIN = 3.86
  const CHINA_LATITUDE_MAX = 53.55
  const CHINA_LONGITUDE_MIN = 73.66
  const CHINA_LONGITUDE_MAX = 135.05

  // 判断是否在范围内
  return (
    latitude >= CHINA_LATITUDE_MIN &&
    latitude <= CHINA_LATITUDE_MAX &&
    longitude >= CHINA_LONGITUDE_MIN &&
    longitude <= CHINA_LONGITUDE_MAX
  )
}

export default isInChina

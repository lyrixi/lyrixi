import type { MapPoint } from '../../components/Map/types/Map.common.types'

/**
 * 坐标转换
 * @param {MapPoint} point
 * @param {String} from 原始坐标类型 'wgs84 | gcj02 | bd09'
 * @param {String} to 转换坐标类型 'wgs84 | gcj02 | bd09'
 * @return {MapPoint} 错误返回null
 */
function transformPoint(point: MapPoint, from: string, to: string): MapPoint | null {
  if (
    !point ||
    point.longitude === null ||
    point.longitude === undefined ||
    point.latitude === null ||
    point.latitude === undefined
  ) {
    console.log('GeoUtil transformPoint: point参数不正确')
    return null
  }
  if (from === to) return point
  if (!from) return point
  if (!to) return point

  const longitude = Number(point.longitude)
  const latitude = Number(point.latitude)

  // 定义一些常量
  const x_PI = (3.14159265358979324 * 3000.0) / 180.0
  const PI = 3.1415926535897932384626
  const a = 6378245.0
  const ee = 0.00669342162296594323

  // 百度经纬度坐标转国测局坐标
  function bd09togcj02(bd_lon: number, bd_lat: number): [number, number] {
    const x_pi = (3.14159265358979324 * 3000.0) / 180.0
    const x = bd_lon - 0.0065
    const y = bd_lat - 0.006
    const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
    const gg_lng = z * Math.cos(theta)
    const gg_lat = z * Math.sin(theta)
    return [gg_lng, gg_lat]
  }

  // 国测局坐标转百度经纬度坐标
  function gcj02tobd09(lng: number, lat: number): [number, number] {
    const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI)
    const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI)
    const bd_lng = z * Math.cos(theta) + 0.0065
    const bd_lat = z * Math.sin(theta) + 0.006
    return [bd_lng, bd_lat]
  }

  function transformlat(lng: number, lat: number) {
    let ret =
      -100.0 +
      2.0 * lng +
      3.0 * lat +
      0.2 * lat * lat +
      0.1 * lng * lat +
      0.2 * Math.sqrt(Math.abs(lng))
    ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0
    ret += ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) / 3.0
    ret += ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) * 2.0) / 3.0
    return ret
  }

  function transformlng(lng: number, lat: number) {
    let ret =
      300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
    ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0
    ret += ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) / 3.0
    ret += ((150.0 * Math.sin((lng / 12.0) * PI) + 300.0 * Math.sin((lng / 30.0) * PI)) * 2.0) / 3.0
    return ret
  }

  function out_of_china(lng: number, lat: number) {
    // 判断是否在国内, 不在国内则不做偏移
    return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271 || false
  }

  // WGS84转国测局坐标
  function wgs84togcj02(lng: number, lat: number): [number, number] {
    if (out_of_china(lng, lat)) {
      return [lng, lat]
    } else {
      let dlat = transformlat(lng - 105.0, lat - 35.0)
      let dlng = transformlng(lng - 105.0, lat - 35.0)
      const radlat = (lat / 180.0) * PI
      let magic = Math.sin(radlat)
      magic = 1 - ee * magic * magic
      const sqrtmagic = Math.sqrt(magic)
      dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI)
      dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI)
      const mglat = lat + dlat
      const mglng = lng + dlng
      return [mglng, mglat]
    }
  }

  // 国测局坐标转换为WGS84
  function gcj02towgs84(lng: number, lat: number): [number, number] {
    if (out_of_china(lng, lat)) {
      return [lng, lat]
    } else {
      let dlat = transformlat(lng - 105.0, lat - 35.0)
      let dlng = transformlng(lng - 105.0, lat - 35.0)
      const radlat = (lat / 180.0) * PI
      let magic = Math.sin(radlat)
      magic = 1 - ee * magic * magic
      const sqrtmagic = Math.sqrt(magic)
      dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI)
      dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI)
      const mglat = lat + dlat
      const mglng = lng + dlng
      return [lng * 2 - mglng, lat * 2 - mglat]
    }
  }

  // WGS84转换为百度坐标
  function wgs84tobd09(lng: number, lat: number): [number, number] {
    const [newLongitude, newLatitude] = wgs84togcj02(lng, lat)
    return gcj02tobd09(newLongitude, newLatitude)
  }

  // 百度坐标转换为WGS84
  function bd09towgs84(lng: number, lat: number): [number, number] {
    const [newLongitude, newLatitude] = bd09togcj02(lng, lat)
    return gcj02towgs84(newLongitude, newLatitude)
  }

  // 方法总结
  let resultLng = longitude
  let resultLat = latitude

  if (from === 'gcj02' && to === 'bd09') {
    ;[resultLng, resultLat] = gcj02tobd09(longitude, latitude)
  } else if (from === 'bd09' && to === 'gcj02') {
    ;[resultLng, resultLat] = bd09togcj02(longitude, latitude)
  } else if (from === 'wgs84' && to === 'gcj02') {
    ;[resultLng, resultLat] = wgs84togcj02(longitude, latitude)
  } else if (from === 'gcj02' && to === 'wgs84') {
    ;[resultLng, resultLat] = gcj02towgs84(longitude, latitude)
  } else if (from === 'wgs84' && to === 'bd09') {
    ;[resultLng, resultLat] = wgs84tobd09(longitude, latitude)
  } else if (from === 'bd09' && to === 'wgs84') {
    ;[resultLng, resultLat] = bd09towgs84(longitude, latitude)
  } else {
    console.log('GeoUtil transformPoint: form或者to参数不正确, 返回原坐标')
    return point
  }

  return {
    ...point,
    longitude: resultLng,
    latitude: resultLat
  }
}

export default transformPoint

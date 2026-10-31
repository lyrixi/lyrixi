import type { BridgeOpenLocationPoint } from './../types'

// 内库使用-start
import GeoUtil from './../../GeoUtil'
// 内库使用-end

/* 测试使用-start
import { GeoUtil } from 'lyrixi-mobile'
测试使用-end */

// 格式化openLocation参数, 坐标自动转换: 国内转gcj02, 国外转wgs84
function formatOpenLocationPoint(
  point: BridgeOpenLocationPoint | null | undefined
): BridgeOpenLocationPoint | null | undefined {
  // 参数不合法
  if (!GeoUtil.isPoint(point) || !point?.type) {
    return point
  }

  // 是否在中国
  let isInChina =
    GeoUtil.isInChina({ longitude: point.longitude, latitude: point.latitude }) === true
  point.isInChina = isInChina

  // 不在中国
  if (!isInChina) {
    const transformed = GeoUtil.transformPoint(
      { longitude: point.longitude, latitude: point.latitude },
      point.type,
      'wgs84'
    )
    if (!transformed) return point

    return {
      ...point,
      longitude: transformed.longitude ?? point.longitude,
      latitude: transformed.latitude ?? point.latitude,
      type: 'wgs84'
    }
  }
  // 在中国
  else {
    const transformed = GeoUtil.transformPoint(
      { longitude: point.longitude, latitude: point.latitude },
      point.type,
      'gcj02'
    )
    if (!transformed) return point

    return {
      ...point,
      longitude: transformed.longitude ?? point.longitude,
      latitude: transformed.latitude ?? point.latitude,
      type: 'gcj02'
    }
  }
}

export default formatOpenLocationPoint

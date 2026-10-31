import type { L } from '../../../Map.leaflet.types'

import type { MapPoint } from '../../../types'
import pointsToWgs84 from './../../../utils/pointsToWgs84'

// 内库使用-start
import GeoUtil from './../../../../../utils/GeoUtil'
// 内库使用-end

// 获取地图中心点，业务侧统一返回 WGS84
function getCenter(leafletMap: L.Map): MapPoint {
  const latlng = leafletMap.getCenter()
  const center: MapPoint = {
    latitude: latlng.lat,
    longitude: latlng.lng
  }

  const isInChina = GeoUtil.isInChina({ longitude: latlng.lng, latitude: latlng.lat })
  if (isInChina) {
    if (window.google || window.AMap) {
      center.type = 'gcj02'
    } else if (window.BMap) {
      center.type = 'bd09'
    } else {
      center.type = 'wgs84'
    }
  } else {
    center.type = 'wgs84'
  }

  const wgs84 = pointsToWgs84(center)
  return {
    latitude: Number(wgs84?.latitude ?? center.latitude),
    longitude: Number(wgs84?.longitude ?? center.longitude),
    type: 'wgs84'
  }
}

export default getCenter

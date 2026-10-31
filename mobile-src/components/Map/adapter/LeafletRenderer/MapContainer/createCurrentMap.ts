import type { CreateCurrentMapParams } from './createMap.types'

// 内库使用-start
import GeoUtil from './../../../../../utils/GeoUtil'
// 内库使用-end

function createCurrentMap(container: HTMLElement, params: CreateCurrentMapParams = {}): unknown {
  const { center } = params
  let wgs84Center: { longitude: number; latitude: number } | null = null

  const centerObj = Array.isArray(center) ? null : center
  const centerArr = Array.isArray(center) ? center : null

  if (GeoUtil.isPoint(centerObj)) {
    wgs84Center = { longitude: centerObj.longitude, latitude: centerObj.latitude }
  } else if (centerArr && centerArr.length && GeoUtil.isPoint(centerArr[0])) {
    wgs84Center = {
      longitude: centerArr[0].longitude,
      latitude: centerArr[0].latitude
    }
  }

  let currentMap: unknown = null

  if (window.google) {
    const googleCenter = new window.google.maps.LatLng(
      Number(wgs84Center?.longitude ?? 0),
      Number(wgs84Center?.latitude ?? 0)
    )
    currentMap = new window.google.maps.Map(container, {
      center: googleCenter,
      zoom: 5,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP
    })
  } else if (window.BMap) {
    const bmapCenter = new window.BMap.Point(
      Number(wgs84Center?.longitude ?? 0),
      Number(wgs84Center?.latitude ?? 0)
    )
    const bmap = new window.BMap.Map(container)
    bmap.centerAndZoom(bmapCenter, 12)
    bmap.disableDragging()
    bmap.disableScrollWheelZoom()
    bmap.disableDoubleClickZoom()
    bmap.disablePinchToZoom()
    currentMap = bmap
  }

  return currentMap
}

export default createCurrentMap

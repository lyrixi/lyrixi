import type { L } from '../../../Map.leaflet.types'
import pointsToMapPoints from './../../../utils/pointsToMapPoints'
import type { MapPoint } from '../../../types'
import type { AddMarkersIconParams, AddMarkersLayersParams } from './addMarkers.types'
import createMarkerDivIcon from './createMarkerDivIcon'
import markerClickLeaflet from './markerClickLeaflet'
import markerClickCanvas from './markerClickCanvas'

// 内库使用-start
import GeoUtil from './../../../../../utils/GeoUtil'
// 内库使用-end

// Marker
function addMarkers(
  points: MapPoint[] | null | undefined,
  iconParams: AddMarkersIconParams,
  layerParams: AddMarkersLayersParams
): void {
  const { icon, onCheck = null, layerOrder } = iconParams
  const { layer, canvasLayer } = layerParams
  if (!canvasLayer || !layer) return

  const list = (Array.isArray(points) ? points : []).filter((point) => point)
  if (list.length === 0) return

  // canvas：点数较多时启用
  const enableCanvas =
    list.length > 100 &&
    !(window.L?.DivIcon && icon instanceof window.L.DivIcon) &&
    !list.some((point) => point.markerIcon)

  // Draw markers（绘制用转换坐标，点击回传用户原始 point）
  // Leaflet 默认按屏幕 Y 算 zIndex；组件层级和数组顺序共同决定叠放顺序。
  const layerZIndex = layerOrder * 1000000
  const zIndexStep = 10000
  const fittedList = pointsToMapPoints(list) as MapPoint[]
  list.forEach((point, index) => {
    const fitted = fittedList[index]
    if (!GeoUtil.isPoint(fitted)) return

    const pointIcon = point.markerIcon ? createMarkerDivIcon(point.markerIcon) : null
    const mIcon: L.Icon | L.DivIcon | null = pointIcon || icon
    const opts: L.MarkerOptions = {
      mapPoint: point,
      zIndexOffset: layerZIndex + index * zIndexStep
    }
    if (mIcon) {
      opts.icon = mIcon
    }
    const marker = window.L!.marker(
      [Number(fitted.latitude), Number(fitted.longitude)] as L.LatLngExpression,
      opts
    )
    if (enableCanvas) {
      canvasLayer.addMarker(marker)
    } else {
      marker.addTo(layer)
    }
  })

  if (!onCheck) return
  if (enableCanvas) {
    markerClickCanvas({
      layerGroup: canvasLayer,
      onCheck
    })
  } else {
    markerClickLeaflet({
      layerGroup: layer,
      onCheck
    })
  }
}

export default addMarkers

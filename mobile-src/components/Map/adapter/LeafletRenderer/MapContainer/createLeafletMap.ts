import type { L } from '../../../Map.leaflet.types'
import pointsToMapPoints from './../../../utils/pointsToMapPoints'
import type { MapPoint } from '../../../types'
import type { CreateLeafletMapParams } from './createMap.types'

// 内库使用-start
import GeoUtil from './../../../../../utils/GeoUtil'
// 内库使用-end

function createLeafletMap(
  container: HTMLElement | null,
  params: CreateLeafletMapParams
): L.Map | Promise<L.Map> | null {
  const { center, minZoom, maxZoom, zoom } = params
  if (!window.L || !window.L?.tileLayer?.currentTileLayer) {
    return null
  }

  const tileLayerEx = window.L.tileLayer as typeof window.L.tileLayer & {
    currentTileLayer?: (() => L.TileLayer) & { config?: Record<string, unknown> }
  }

  let centerPoint: [number, number] | [] = []
  if (center && !Array.isArray(center) && GeoUtil.isPoint(center)) {
    const fitted = pointsToMapPoints(center as MapPoint) as MapPoint | null
    if (GeoUtil.isPoint(fitted)) {
      centerPoint = [fitted.latitude as number, fitted.longitude as number]
    }
  }

  const config: Record<string, unknown> = {
    attributionControl: false,
    zoomControl: false,
    center: centerPoint,
    ...(tileLayerEx.currentTileLayer?.config || {}),
    maxZoom: maxZoom || (tileLayerEx.currentTileLayer?.config?.maxZoom as number | undefined) || 18,
    minZoom: minZoom || (tileLayerEx.currentTileLayer?.config?.minZoom as number | undefined) || 3,
    zoom: zoom || (tileLayerEx.currentTileLayer?.config?.zoom as number | undefined) || 13
  }

  const map = window.L.map(container as HTMLElement, config as L.MapOptions)

  if (!tileLayerEx.currentTileLayer) {
    return map
  }

  const tileLayer = tileLayerEx.currentTileLayer()
  tileLayer.addTo(map)

  return new Promise<L.Map>((resolve) => {
    tileLayer.on('load', function () {
      resolve(map)
    })
  })
}

export default createLeafletMap

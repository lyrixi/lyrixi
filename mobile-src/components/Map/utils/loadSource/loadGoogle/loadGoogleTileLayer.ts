import type { L } from '../../../Map.leaflet.types'

// 加载google地图leaflet插件
function loadGoogleTileLayer() {
  const Leaf = window.L!
  Leaf.tileLayer.currentTileLayer = function () {
    return Leaf.tileLayer(
      'https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}&scale=2'
    ) as L.TileLayer
  }

  // maxBounds
  let southWest = Leaf.latLng(-85.05112878, -Infinity)
  let northEast = Leaf.latLng(85.05112878, Infinity)
  const maxBounds = Leaf.latLngBounds(southWest, northEast)

  // maxZoom, minZoom
  Leaf.tileLayer.currentTileLayer.config = {
    maxBounds,
    maxZoom: 18,
    minZoom: 1
  }
}

export default loadGoogleTileLayer

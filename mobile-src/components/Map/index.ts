/*
 * 说明: 业务侧出入参一律使用 WGS84；Leaflet 绘制瓦片/搜索时在内部通过 pointsToMapPoints 纠偏。
 * getCenter、queryNearby 等出参统一返回 WGS84。Leaflet 1.9.4 仅内部使用，不对外暴露。
 * https://leafletjs.com
 */

// Utils
import pointsToWgs84 from './utils/pointsToWgs84'
import getAddress from './utils/getAddress'
import getLocation from './utils/getLocation'
import queryNearby from './utils/queryNearby'

// Components
import Provider from './components/Provider'
import MapContainer from './components/MapContainer'
import ZoomControl from './components/ZoomControl'
import SearchControl from './components/SearchControl'
import Markers from './components/Markers'
import Circles from './components/Circles'
import Polyline from './components/Polyline'
import Polygon from './components/Polygon'
import LocationControl from './components/LocationControl'
import NearbyControl from './components/NearbyControl'

// Pages
import MapChoosePage from './pages/MapChoosePage'
import MapMarkersPage from './pages/MapMarkersPage'

import type { MapComponents } from './types/Map.modules.types'

const Map = {} as MapComponents

Map.pointsToWgs84 = pointsToWgs84
Map.getAddress = getAddress
Map.getLocation = getLocation
Map.queryNearby = queryNearby
Map.Provider = Provider
Map.MapContainer = MapContainer
Map.ZoomControl = ZoomControl
Map.SearchControl = SearchControl
Map.Markers = Markers
Map.Circles = Circles
Map.Polyline = Polyline
Map.Polygon = Polygon
Map.LocationControl = LocationControl
Map.NearbyControl = NearbyControl
Map.MapChoosePage = MapChoosePage
Map.MapMarkersPage = MapMarkersPage

export default Map

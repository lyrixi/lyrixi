import pointsToWgs84 from '../utils/pointsToWgs84'
import getAddress from '../utils/getAddress'
import getLocation from '../utils/getLocation'
import queryNearby from '../utils/queryNearby'

import Provider from '../components/Provider'
import MapContainer from '../components/MapContainer'
import ZoomControl from '../components/ZoomControl'
import SearchControl from '../components/SearchControl'
import Markers from '../components/Markers'
import Circles from '../components/Circles'
import Polyline from '../components/Polyline'
import Polygon from '../components/Polygon'
import LocationControl from '../components/LocationControl'
import NearbyControl from '../components/NearbyControl'
import MapChoosePage from '../pages/MapChoosePage'
import MapMarkersPage from '../pages/MapMarkersPage'

export type MapComponents = {
  pointsToWgs84: typeof pointsToWgs84
  getAddress: typeof getAddress
  getLocation: typeof getLocation
  queryNearby: typeof queryNearby
  Provider: typeof Provider
  MapContainer: typeof MapContainer
  ZoomControl: typeof ZoomControl
  SearchControl: typeof SearchControl
  Markers: typeof Markers
  Circles: typeof Circles
  Polyline: typeof Polyline
  Polygon: typeof Polygon
  LocationControl: typeof LocationControl
  NearbyControl: typeof NearbyControl
  MapChoosePage: typeof MapChoosePage
  MapMarkersPage: typeof MapMarkersPage
}

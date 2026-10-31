import type { MapType } from '../../types/Map.Provider.types'

const MapProvider = {
  key: '',
  getMapType: null as (() => MapType | null) | null
}

export default MapProvider

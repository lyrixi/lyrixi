import { createContext } from 'react'

import type { MapProviderConfig, MapProviderProps } from '../../types/Map.Provider.types'
import type getAddress from '../../utils/getAddress'
import type getLocation from '../../utils/getLocation'
import type queryNearby from '../../utils/queryNearby'
import type MapProvider from './MapProvider'

export interface MapProviderContextValue {
  config: MapProviderConfig
  reload: () => void
  getAddress: typeof getAddress
  getLocation: typeof getLocation
  getMapType: NonNullable<typeof MapProvider.getMapType>
  openLocation: NonNullable<MapProviderProps['openLocation']>
  queryNearby: typeof queryNearby
}

const MapProviderContext = createContext<MapProviderContextValue | null>(null)

export default MapProviderContext

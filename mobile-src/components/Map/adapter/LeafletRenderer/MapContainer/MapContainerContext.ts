import { createContext } from 'react'

import type { MapContainerContextValue } from '../../../types/Map.MapContainer.types'

const MapContainerContext = createContext<MapContainerContextValue | null>(null)

export default MapContainerContext

import MapProvider from '../../components/Provider/MapProvider'
import type { MapType } from '../../types'

function getMapType(): MapType | null {
  return MapProvider.getMapType?.() ?? null
}

export default getMapType

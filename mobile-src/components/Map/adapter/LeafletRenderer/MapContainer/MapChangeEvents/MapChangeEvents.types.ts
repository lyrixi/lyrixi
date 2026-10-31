import type { MapChangeEvent } from '../../../../types'

export interface MapChangeEventsHandlers {
  onMapChange?: (event: MapChangeEvent) => void
}

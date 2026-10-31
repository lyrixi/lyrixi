import type { MapPoint } from '../../../../types/Map.common.types'

export interface MapNearbyControlCurrentProps {
  // Value & Display Value
  value?: MapPoint
  // Status
  readOnly?: boolean
  // Events
  onChange?: (item: unknown) => void
}

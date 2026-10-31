import type { MapNearbyTabItem, MapPoint, QueryNearbyResult } from '../../../types'

export interface MapNearbyControlMainProps {
  // Value & Display Value
  tab: MapNearbyTabItem
  value?: MapPoint
  radius?: number
  // Events
  onChange?: (item: Record<string, unknown>) => void
  onSuccess?: (result: QueryNearbyResult) => void
  onError?: (result: QueryNearbyResult) => void
}

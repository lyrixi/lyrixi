import type { MapPoint, QueryNearbyResult } from './Map.common.types'
import getTabs from '../adapter/LeafletRenderer/NearbyControl/utils/getTabs'

export interface MapNearbyControlProps {
  // Value & Display Value
  id?: string
  value?: MapPoint
  radius?: number
  // Status
  readOnly?: boolean
  nearbyVisible?: boolean
  // Events
  onChange?: (item: unknown) => void
  onSuccess?: (result: QueryNearbyResult) => void
  onError?: (result: QueryNearbyResult) => void
}

export interface MapNearbyControlRef {
  element: HTMLDivElement | null
  reload: () => void
}

export type MapNearbyTabItem = ReturnType<typeof getTabs>[number]

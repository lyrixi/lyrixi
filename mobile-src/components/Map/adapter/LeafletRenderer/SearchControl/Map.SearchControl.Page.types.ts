import type { QueryNearbyResult } from '../../../types/Map.common.types'

// Search 弹层内 queryNearby 返回形态
export type MapSearchControlSearchQueryNearbyResult = QueryNearbyResult

export interface MapSearchControlPageProps {
  // Status
  open: boolean
  // Events
  onClose?: () => void
  onChange?: (item: unknown) => void
}

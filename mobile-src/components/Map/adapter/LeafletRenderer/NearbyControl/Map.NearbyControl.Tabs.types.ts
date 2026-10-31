import type { MapNearbyTabItem } from '../../../types/Map.NearbyControl.types'

export interface MapNearbyControlTabsProps {
  tab: MapNearbyTabItem
  onChange: (t: MapNearbyTabItem) => void
}

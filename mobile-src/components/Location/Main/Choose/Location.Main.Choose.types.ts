import type {
  GetAddressFn,
  GetLocationFn,
  MapProviderConfig,
  MapProviderProps
} from '../../../Map/types'
import type { LocationValue } from '../../types/Location.common.types'

export interface LocationMainChooseProps {
  // Value & Display Value
  value?: LocationValue | null
  cacheDuration?: number
  autoLocation?: boolean
  mapConfig?: MapProviderConfig
  getLocation?: GetLocationFn | null
  getAddress?: GetAddressFn | null
  // Status
  readOnly?: boolean
  nearbyVisible?: boolean
  // Elements
  loadingRender?: MapProviderProps['loadingRender']
  // Events
  onChange?: (value: LocationValue | null) => void
  onSuccess?: MapProviderProps['onSuccess']
  onError?: MapProviderProps['onError']
}

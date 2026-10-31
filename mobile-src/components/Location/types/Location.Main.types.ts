import type { CSSProperties } from 'react'

import type { LocationValue } from './Location.common.types'

// 内库使用-start
import type { GetAddressFn, GetLocationFn } from '../../Map/types'
// 内库使用-end

export interface LocationMainRef {
  mainElement: HTMLDivElement | null
  getMainElement: () => HTMLDivElement | null
}

export interface LocationMainProps {
  // Value & Display Value
  value?: LocationValue | null
  cacheDuration?: number
  // Status
  open?: string
  autoLocation?: boolean
  nearbyVisible?: boolean
  // Style
  className?: string
  style?: CSSProperties
  // Elements
  id?: string
  mapConfig?: Record<string, unknown>
  getLocation?: GetLocationFn | null
  getAddress?: GetAddressFn | null
  // Events
  onChange?: (value: LocationValue | null) => void
  onOk?: ((value: LocationValue | null) => void) | null
  onClear?: (() => void) | null
}

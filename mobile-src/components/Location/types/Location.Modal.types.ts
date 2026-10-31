import type { CSSProperties } from 'react'

import type { LocationMainRef } from './Location.Main.types'
import type { LocationValue } from './Location.common.types'

// 内库使用-start
import type { GetAddressFn, GetLocationFn } from '../../Map/types'
import type { ModalRef } from '../../Modal/types'
// 内库使用-end

export interface LocationModalRef extends ModalRef, LocationMainRef {}

export interface LocationModalProps {
  // Value & Display Value
  id?: string
  value?: LocationValue | null
  cacheDuration?: number
  // Status
  open?: string
  maskClosable?: boolean
  safeArea?: boolean
  allowClear?: boolean
  multiple?: boolean
  nearbyVisible?: boolean
  // Style
  modalClassName?: string
  modalStyle?: CSSProperties
  maskStyle?: CSSProperties
  maskClassName?: string
  // Elements
  portal?: Element | null
  mapConfig?: Record<string, unknown>
  getLocation?: GetLocationFn | null
  getAddress?: GetAddressFn | null
  // Events
  onOk?: ((value: LocationValue | null) => unknown) | null
  onChange?: ((value: LocationValue | null) => void) | null
  onClose?: (() => void) | null
}

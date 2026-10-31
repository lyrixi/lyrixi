import type { MapPointType } from '../../Map/types'

export interface LocationValue {
  latitude?: number | string
  longitude?: number | string
  type?: MapPointType
  address?: string
  value?: string
  nearbyVisible?: boolean
  [key: string]: unknown
}

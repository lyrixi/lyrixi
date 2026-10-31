import type { ReactNode } from 'react'

import type {
  MapPoint,
  MarkerIcons,
  GetAddressFn,
  GetLocationFn,
  QueryNearbyParams,
  QueryNearbyResult
} from './Map.common.types'

export type MapType = 'google' | 'bmap' | 'amap'

// Provider / loadSource 返回结果，形态对齐 Bridge `{ status, code, data }`
export interface MapLoadSourceResult {
  status: 'success' | 'error'
  code?: string
  message?: string | ReactNode
  data?: unknown
}

export type MapKey = {
  android?: string
  ios?: string
  web?: string
}

export interface MapProviderConfig {
  bmapKeys?: MapKey
  googleKeys?: MapKey
  amapKeys?: MapKey
  type?: MapType
  markerIcons?: MarkerIcons
  center?: MapPoint
  [key: string]: unknown
}

export interface MapProviderSuccessResult {
  status: 'success'
  code?: string
  message?: string
}

export interface MapProviderProps {
  // Value & Display Value
  id?: string
  config?: MapProviderConfig
  cacheDuration?: number
  getAddress?: GetAddressFn | null
  getLocation?: GetLocationFn | null
  openLocation?: ((...args: unknown[]) => unknown) | null
  queryNearby?:
    | ((params: QueryNearbyParams) => Promise<QueryNearbyResult> | QueryNearbyResult)
    | null
  loadingRender?: (() => ReactNode) | null
  children?: ReactNode
  onError?:
    | ((
        result: MapLoadSourceResult & { reload?: () => void }
      ) => Promise<MapLoadSourceResult | undefined> | MapLoadSourceResult | undefined | void)
    | null
  onSuccess?: ((result: MapProviderSuccessResult) => void) | null
}

export interface MapProviderRef {
  reload: () => void
}

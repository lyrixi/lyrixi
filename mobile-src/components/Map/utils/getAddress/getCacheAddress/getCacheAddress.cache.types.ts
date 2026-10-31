import type { MapPointType } from '../../../types'

export interface GetCacheAddressParams {
  extendCacheDuration?: boolean
  cacheDuration?: number | null
  type: MapPointType
  latitude: number
  longitude: number
}

// Storage 中地址缓存条目的反序列化形态
export interface AddressCachePayload {
  data?: unknown
  expires?: number
  point?: { latitude: number; longitude: number }
}

// setAddressCache 第一个参数
export interface SetAddressCacheParams {
  latitude: number
  longitude: number
  cacheDuration?: number | null
}

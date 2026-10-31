import type { GetLocationResult, MapPointType } from '../../../types'

export interface GetCacheLocationParams {
  timeout?: number
  extendCacheDuration?: boolean
  cacheDuration?: number | null
  type: MapPointType
}

// getCacheLocation 内部调用的定位参数（与 utils/getLocation 的 GetLocationParams 区分）
export interface GetCacheLocationCallParams {
  browser?: boolean
  extendCacheDuration?: boolean
  cacheDuration?: number | null
  timeout?: number
  type: MapPointType
}

// 写入定位缓存时的数据形态（与对外 Result 同形）
export type LocCacheData = GetLocationResult

// Storage.getItem 读出的定位缓存条目
export interface LocationStorageCache {
  data?: LocCacheData
  expires?: number
}

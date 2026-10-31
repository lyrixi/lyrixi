import type { MapKey, MapType } from '../../types/Map.Provider.types'

export interface MapLoaderSourceConfig {
  bmapKeys?: MapKey
  googleKeys?: MapKey
  amapKeys?: MapKey
  type?: MapType
  leaflet?: { css?: string; js?: string }
  [key: string]: unknown
}

// loadSource 返回结果，形态对齐 Bridge `{ status, code, data }`
export interface LoadSourceResult {
  status: string
  code?: string
  message?: string
  data?: unknown
}

// loadBaidu / loadGoogle 等对子步骤返回的轻量形态
export interface LoadStatus {
  status?: string
  code?: string
  message?: string
  data?: unknown
}

export interface LoadLeafletParams {
  css?: string
  js?: string
}

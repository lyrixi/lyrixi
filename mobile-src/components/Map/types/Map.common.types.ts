export interface MapMarkerIcon {
  // 显示文字
  text?: string
  // 背景图片
  backgroundImage?: string
  // 背景颜色
  backgroundColor?: string
  // 宽度
  width: number
  // 高度
  height: number
  // 边框颜色
  borderColor?: string
  // 边框宽度（px）
  borderWidth?: number
  // 圆角（px）
  borderRadius?: number
  // 阴影颜色
  shadowColor?: string
  // 阴影透明度
  shadowOpacity?: number
  // 阴影偏移
  shadowOffset?: {
    width?: number
    height?: number
  }
  // 阴影模糊半径（px）
  shadowRadius?: number
  // 字体大小
  fontSize?: number
  // 字体颜色，默认黑色
  color?: string
  // 字体粗细
  fontWeight?: number
}

// 默认图标配置
export interface MarkerIcons {
  centerMarkerIcon?: MapMarkerIcon
  markerIcon?: MapMarkerIcon
}

// 坐标系类型
export type MapPointType = 'wgs84' | 'gcj02' | 'bd09'

// 地图通用坐标点（与 createLeafletMap / panTo / Marker 等一致）
export interface MapPoint {
  // 业务自定义点 id
  id?: string | number
  latitude?: number
  longitude?: number
  type?: MapPointType
  address?: string
  name?: string
  // 定位时返回的精度
  accuracy?: number
  // Marker 绘制时使用
  markerIcon?: MapMarkerIcon | null
  [key: string]: unknown
}

// Markers / Circles 等点选中回调（挂在控件上，不挂在 MapPoint 上）
export type MapPointCheckHandler = (point: MapPoint) => void

// getAddress 聚合入口入参（允许 null）
export interface GetAddressParams extends MapPoint {
  extendCacheDuration?: boolean
  cacheDuration?: number | null
}

// {@link Map.getAddress} 返回结果，形态对齐 Bridge `{ status, code, data }`
export interface GetAddressResult {
  status?: string
  code?: string
  message?: string
  data?: MapPoint
}

/** {@link Map.getAddress} / MapProvider / Location 等复用的地址解析函数类型 */
export type GetAddressFn = (
  params: GetAddressParams
) => Promise<GetAddressResult> | GetAddressResult

export interface GetLocationParams {
  timeout?: number
  extendCacheDuration?: boolean
  cacheDuration?: number | null
  type?: MapPointType
}

// {@link Map.getLocation} 返回结果，形态对齐 Bridge `{ status, code, data }`
export interface GetLocationResult {
  status?: string
  code?: string
  message?: string
  data?: MapPoint
}

/** {@link Map.getLocation} / MapProvider / Location 等复用的定位函数类型 */
export type GetLocationFn = (
  params?: GetLocationParams
) => Promise<GetLocationResult> | GetLocationResult

export interface QueryNearbyParams {
  map?: { _currentMap?: unknown; _leafletMap?: unknown }
  keyword: string
  longitude: number | string
  latitude: number | string
  type: MapPointType
  radius?: number
}

// {@link Map.queryNearby} 成功时 `data`
export interface QueryNearbyResultData {
  list?: MapPoint[]
}

// {@link Map.queryNearby} 返回结果，形态对齐 Bridge `{ status, code, data }`
export interface QueryNearbyResult {
  status: string
  code?: string
  message?: string
  data?: QueryNearbyResultData
}

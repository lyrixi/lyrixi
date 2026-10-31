/**
 * Leaflet 与 CDN 注入的 `window.L` 对齐的最小类型（不依赖 npm `leaflet` / `@types/leaflet`）。
 * 仅覆盖本库 Map 相关实现用到的 API；完整定义见 https://leafletjs.com/reference.html
 *
 * 仅供 Map 组件内部使用，禁止通过 `lyrixi-mobile` 对外导出或在业务侧直接依赖。
 */

export namespace L {
  export type LatLng = { lat: number; lng: number }

  export type LatLngExpression = [number, number] | LatLng

  export type LatLngBoundsExpression = LatLngExpression[] | unknown

  export type MapOptions = Record<string, unknown>

  export interface IconOptions extends Record<string, unknown> {
    active?: boolean
  }

  export type DivIconOptions = Record<string, unknown>

  export interface Icon {
    options: IconOptions
  }

  export interface DivIcon {
    options: DivIconOptions
  }

  export interface MarkerOptions extends Record<string, unknown> {
    icon?: Icon | DivIcon
    zIndexOffset?: number
  }

  export interface TileLayer {
    addTo(map: Map): this
    on(type: string, fn: () => void): this
  }

  export interface Map {
    setView(center: LatLngExpression, zoom?: number, options?: unknown): this
    fitBounds(bounds: LatLngBoundsExpression, options?: { padding?: [number, number] }): this
    panTo(center: LatLngExpression, options?: unknown): this
    zoomIn(delta?: number): this
    zoomOut(delta?: number): this
    getZoom(): number
    setZoom(zoom: number): this
    getCenter(): LatLng
    getContainer(): HTMLElement
    on(type: string, fn: (...args: unknown[]) => void): this
    once(type: string, fn: (...args: unknown[]) => void): this
  }

  export interface Layer {
    addTo(map: Map | LayerGroup): this
    on(type: string, fn: (e: LeafletMouseEvent) => void): this
    remove(): this
  }

  export interface LayerGroup extends Layer {
    clearLayers(): this
    eachLayer(fn: (layer: Layer) => void, context?: unknown): this
  }

  export interface Marker extends Layer {
    options: MarkerOptions & { icon?: Icon }
    setIcon(icon: Icon | DivIcon): this
  }

  export interface LeafletMouseEvent {
    target: Marker
    latlng?: { lat: number; lng: number }
  }
}

// `window.L`：与运行时 CDN 脚本暴露对象一致的最小形状（供 global-augmentations 使用）
export type LeafletWithPlugins = {
  map: (el: HTMLElement | null, options?: L.MapOptions) => L.Map
  marker: (latlng: L.LatLngExpression, options?: L.MarkerOptions) => L.Marker
  tileLayer: ((...args: unknown[]) => L.TileLayer) & {
    currentTileLayer?: (() => L.TileLayer) & { config?: Record<string, unknown> }
  }
  Icon: new (options?: L.IconOptions) => L.Icon
  DivIcon: new (options?: L.DivIconOptions) => L.DivIcon
  /** 小写工厂，与 CDN Leaflet 一致 */
  icon: (options?: L.IconOptions) => L.Icon
  divIcon: (options?: L.DivIconOptions) => L.DivIcon
  layerGroup: (...args: unknown[]) => L.LayerGroup
  polyline: (...args: unknown[]) => L.Layer & { addTo: (m: L.Map | L.LayerGroup) => unknown }
  polygon: (...args: unknown[]) => L.Layer & { addTo: (m: L.Map | L.LayerGroup) => unknown }
  circle: (...args: unknown[]) => L.Layer & { addTo: (m: L.Map | L.LayerGroup) => unknown }
  latLng: (...args: unknown[]) => { lat: number; lng: number }
  latLngBounds: (...args: unknown[]) => unknown
  Util: {
    extend: (...args: unknown[]) => unknown
    template: (str: string, data: unknown, ...rest: unknown[]) => string
  }
  CRS: { Earth: unknown }
  Projection: { Mercator: unknown }
  Bounds: new (corner1: unknown, corner2: unknown) => unknown
  Browser: { retina?: boolean }
  extend: (...args: unknown[]) => unknown
  transformation: (a: number, b: number, c: number, d: number) => object
  TileLayer: {
    extend: (props: Record<string, unknown>) => unknown
    prototype: {
      initialize: (this: unknown, url: string, options: Record<string, unknown>) => void
      getTileUrl: (this: unknown, coords: unknown) => string
    }
  }
  Layer?: { extend?: (props: Record<string, unknown>) => unknown }
  Class?: unknown
  canvasIconLayer?: (options?: Record<string, unknown>) => unknown
  [key: string]: unknown
}

---
group:
  title: 数据展示
  order: 5
order: 1
title: Map
toc: content
---

## Map.MapContainer

地图组件，用于显示和操作地图。

业务侧坐标约定：出入参一律使用 **WGS84**（`type: 'wgs84'`）。瓦片纠偏与厂商坐标系转换由组件内部处理。

### 何时使用

- 需要显示地图时
- 需要在地图上标注位置时
- 需要选择地理位置时

### 代码演示

<code src="./demos/MapMapContainer.tsx"></code>

### API

#### 属性

| 属性        | 说明         | 类型                                                            | 默认值 |
| ----------- | ------------ | --------------------------------------------------------------- | ------ |
| center      | 地图中心点   | `MapPoint \| Array<MapPoint>`                                   | -      |
| zoom        | 缩放级别     | `number`                                                        | -      |
| minZoom     | 最小缩放级别 | `number`                                                        | -      |
| maxZoom     | 最大缩放级别 | `number`                                                        | -      |
| style       | 自定义样式   | `CSSProperties`                                                 | -      |
| className   | 自定义类名   | `string`                                                        | -      |
| children    | 地图内容     | `ReactNode`                                                     | -      |
| onLoad      | 加载完成事件 | `(result: { status, code?, message?, data?: { map } }) => void` | -      |
| onMapChange | 视图变化结束 | `(event: MapChangeEvent) => void`                               | -      |

`MapChangeEvent` 中 `latitude`、`longitude` 统一为 **WGS84**，`type` 固定为 `'wgs84'`。

```ts
type MapChangeEvent = Readonly<{
  actions: ('pan' | 'zoom')[]
  actionType: 'gesture' | 'programmatic'
  latitude: number
  longitude: number
  type: 'wgs84'
  zoom: number
}>
```

说明：`MapPoint` 含 `id`、`latitude`、`longitude`、`type`、`markerIcon` 等字段。单点标记使用
`markerIcon` 配置背景图、文字、尺寸和文字样式。

```ts
interface MapMarkerIcon {
  text?: string
  backgroundImage?: string
  backgroundColor?: string
  width: number
  height: number
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
  shadowColor?: string
  shadowOpacity?: number
  shadowOffset?: {
    width?: number
    height?: number
  }
  shadowRadius?: number
  fontSize?: number
  // 默认黑色
  color?: string
  fontWeight?: number
}
```

#### Ref

| 属性      | 说明                   | 类型                                       |
| --------- | ---------------------- | ------------------------------------------ |
| element   | 根元素                 | `HTMLDivElement \| null`                   |
| type      | 地图类型               | `string`                                   |
| center    | 当前中心点             | `MapPoint`                                 |
| panTo     | 平移至坐标             | `(points: MapPoint \| MapPoint[]) => void` |
| getCenter | 获取中心点（WGS84）    | `() => MapPoint`                           |
| zoomIn    | 放大，返回缩放后的级别 | `() => Promise<number \| null>`            |
| zoomOut   | 缩小，返回缩放后的级别 | `() => Promise<number \| null>`            |
| getZoom   | 获取缩放级别           | `() => number \| null`                     |
| setZoom   | 设置缩放级别           | `(zoom: number) => unknown`                |

## Map.ZoomControl

地图缩放控制组件。

### 何时使用

- 需要显示地图缩放控制时

### 代码演示

<code src="./demos/MapZoomControl.tsx"></code>

### API

#### 属性

| 属性      | 说明       | 类型                             | 默认值 |
| --------- | ---------- | -------------------------------- | ------ |
| id        | 元素 id    | `string`                         | -      |
| style     | 自定义样式 | `CSSProperties`                  | -      |
| className | 自定义类名 | `string`                         | -      |
| onZoomIn  | 放大事件   | `(zoom: number \| null) => void` | -      |
| onZoomOut | 缩小事件   | `(zoom: number \| null) => void` | -      |

#### Ref

| 属性    | 说明   | 类型                     |
| ------- | ------ | ------------------------ |
| element | 根元素 | `HTMLDivElement \| null` |

## Map.SearchControl

地图搜索控制组件。

### 何时使用

- 需要显示地图搜索控制时

### 代码演示

<code src="./demos/MapSearchControl.tsx"></code>

### API

#### 属性

| 属性      | 说明         | 类型                      | 默认值 |
| --------- | ------------ | ------------------------- | ------ |
| map       | 地图实例 API | `MapContainerAPI`         | -      |
| style     | 自定义样式   | `CSSProperties`           | -      |
| className | 自定义类名   | `string`                  | -      |
| onChange  | 选中变化事件 | `(item: unknown) => void` | -      |

## Map.Markers

地图标记组件。

### 何时使用

- 需要显示地图标记时

### 代码演示

<code src="./demos/MapMarkers.tsx"></code>

### API

#### 属性

| 属性      | 说明         | 类型                        | 默认值 |
| --------- | ------------ | --------------------------- | ------ |
| points    | 标记点列表   | `unknown`                   | -      |
| map       | 地图实例 API | `MapContainerAPI`           | -      |
| style     | 自定义样式   | `CSSProperties`             | -      |
| className | 自定义类名   | `string`                    | -      |
| onCheck   | 选中事件     | `(point: MapPoint) => void` | -      |

标记层级由 `points` 数组顺序决定（后绘制的在上层），业务侧自行调整数组顺序即可。
单点标记通过 `MapPoint.markerIcon` 绘制，支持在背景图片上显示文字并控制文字样式及排列。

## Map.Circles

地图圆形组件。

### 何时使用

- 需要显示地图圆形时

### 代码演示

<code src="./demos/MapCircles.tsx"></code>

### API

#### 属性

| 属性    | 说明         | 类型                        | 默认值 |
| ------- | ------------ | --------------------------- | ------ |
| points  | 圆形点列表   | `unknown`                   | -      |
| color   | 描边颜色     | `string`                    | -      |
| radius  | 默认半径     | `number`                    | -      |
| map     | 地图实例 API | `MapContainerAPI`           | -      |
| onCheck | 选中事件     | `(point: MapPoint) => void` | -      |

## Map.Polyline

地图折线组件。

### 何时使用

- 需要显示地图折线时

### 代码演示

<code src="./demos/MapPolyline.tsx"></code>

### API

#### 属性

| 属性   | 说明         | 类型              | 默认值 |
| ------ | ------------ | ----------------- | ------ |
| points | 折线顶点列表 | `unknown`         | -      |
| color  | 线条颜色     | `string`          | -      |
| map    | 地图实例 API | `MapContainerAPI` | -      |

## Map.Polygon

地图多边形组件。

### 何时使用

- 需要在地图上绘制封闭区域时（如行政区、围栏、范围框）
- 需要显示带填充的折线闭合图形时

### 代码演示

<code src="./demos/MapPolygon.tsx"></code>

### API

#### 属性

| 属性        | 说明         | 类型              | 默认值      |
| ----------- | ------------ | ----------------- | ----------- |
| points      | 顶点坐标列表 | `unknown`         | -           |
| color       | 描边颜色     | `string`          | `'#3388ff'` |
| fillColor   | 填充颜色     | `string`          | 同 color    |
| fillOpacity | 填充透明度   | `number`          | `0.2`       |
| weight      | 描边宽度     | `number`          | `2`         |
| map         | 地图实例 API | `MapContainerAPI` | -           |

说明：`points` 至少 3 个点，首尾会自动闭合形成多边形。坐标需包含 `latitude`、`longitude`、`type`，建议使用 `Map.pointsToWgs84` 转换后传入。

## Map.LocationControl

地图定位控制组件。

### 何时使用

- 需要显示地图定位控制时

### 代码演示

<code src="./demos/MapLocationControl.tsx"></code>

### API

#### 属性

| 属性      | 说明         | 类型                        | 默认值 |
| --------- | ------------ | --------------------------- | ------ |
| map       | 地图实例 API | `MapContainerAPI`           | -      |
| style     | 自定义样式   | `CSSProperties`             | -      |
| className | 自定义类名   | `string`                    | -      |
| onChange  | 定位变化事件 | `(result: unknown) => void` | -      |

#### Ref

| 属性    | 说明         | 类型                     |
| ------- | ------------ | ------------------------ |
| element | 根元素       | `HTMLDivElement \| null` |
| update  | 更新当前位置 | `() => Promise<unknown>` |

## Map.NearbyControl

地图附近控制组件。

### 何时使用

- 需要显示地图附近控制时

### 代码演示

<code src="./demos/MapNearbyControl.tsx"></code>

### API

#### 属性

| 属性          | 说明         | 类型                        | 默认值 |
| ------------- | ------------ | --------------------------- | ------ |
| value         | 当前选中位置 | `MapPoint`                  | -      |
| radius        | 附近搜索半径 | `number`                    | -      |
| map           | 地图实例 API | `MapContainerAPI`           | -      |
| readOnly      | 是否只读     | `boolean`                   | -      |
| nearbyVisible | 是否显示附近 | `boolean`                   | -      |
| onChange      | 选中变化事件 | `(item: unknown) => void`   | -      |
| onSuccess     | 查询成功事件 | `(result: unknown) => void` | -      |
| onError       | 查询失败事件 | `(result: unknown) => void` | -      |

#### Ref

| 属性    | 说明     | 类型                     |
| ------- | -------- | ------------------------ |
| element | 根元素   | `HTMLDivElement \| null` |
| reload  | 重新加载 | `() => void`             |

## Map.MapChoosePage

地图选择页面组件。

### 何时使用

- 需要显示地图选择页面时

### 代码演示

<code src="./demos/MapMapChoosePage.tsx"></code>

### API

#### 属性

| 属性      | 说明       | 类型            | 默认值 |
| --------- | ---------- | --------------- | ------ |
| style     | 自定义样式 | `CSSProperties` | -      |
| className | 自定义类名 | `string`        | -      |
| children  | 页面内容   | `ReactNode`     | -      |

#### Ref

| 属性    | 说明   | 类型                     |
| ------- | ------ | ------------------------ |
| element | 根元素 | `HTMLDivElement \| null` |

## Map.Provider

地图 Provider，用于加载地图 SDK 并向子树注入配置。

### 何时使用

- 需要预加载地图 SDK 和资源时
- 确保地图组件所需的外部库已就绪时

### 代码演示

<code src="./demos/MapProvider.tsx"></code>

### API

#### 属性

| 属性          | 说明         | 类型                                                                                               | 默认值 |
| ------------- | ------------ | -------------------------------------------------------------------------------------------------- | ------ |
| config        | 地图配置     | `{ bmapKeys?: MapKey; googleKeys?: MapKey; amapKeys?: MapKey; type?: 'google' \| 'bmap' \| 'amap'; [key: string]: unknown }` | -      |
| getAddress    | 获取地址函数 | `((...args: unknown[]) => unknown) \| null`                                                        | -      |
| getLocation   | 获取位置函数 | `((...args: unknown[]) => unknown) \| null`                                                        | -      |
| openLocation  | 打开位置函数 | `((...args: unknown[]) => unknown) \| null`                                                        | -      |
| queryNearby   | 查询附近函数 | `((...args: unknown[]) => unknown) \| null`                                                        | -      |
| loadingRender | 加载中渲染   | `(() => ReactNode) \| null`                                                                        | -      |
| children      | 子元素       | `ReactNode`                                                                                        | -      |
| onError       | 错误事件     | `((result: MapLoadSourceResult & { reload?: () => void }) => ...) \| null`                         | -      |
| onSuccess     | 成功事件     | `((result: MapProviderSuccessResult) => void) \| null`                                             | -      |

#### Ref

| 属性   | 说明     | 类型         |
| ------ | -------- | ------------ |
| reload | 重新加载 | `() => void` |

## Map.pointsToWgs84

坐标转换为 WGS84（工具函数）。

### 参数

| 参数  | 说明 | 类型     | 默认值 |
| ----- | ---- | -------- | ------ |
| point | 坐标点 | `object` | -      |

### 返回值

| 类型     | 说明       |
| -------- | ---------- |
| `object` | WGS84 坐标 |

## Map.getAddress

获取地址（工具函数）。

### 参数

| 参数  | 说明 | 类型     | 默认值 |
| ----- | ---- | -------- | ------ |
| point | 坐标点 | `object` | -      |

### 返回值

| 类型                                                    | 说明                  |
| ------------------------------------------------------- | --------------------- |
| `Promise<{ status, code?, message?, data?: MapPoint }>` | 地址在 `data.address` |

## Map.getLocation

获取位置（工具函数）。

### 参数

无参数。

### 返回值

| 类型                                                    | 说明            |
| ------------------------------------------------------- | --------------- |
| `Promise<{ status, code?, message?, data?: MapPoint }>` | 经纬度在 `data` |

## Map.queryNearby

查询附近（工具函数）。成功时 `data.list` 中坐标统一为 WGS84（`type: 'wgs84'`）。

### 参数

| 参数     | 说明 | 类型     | 默认值 |
| -------- | ---- | -------- | ------ |
| location | 位置 | `object` | -      |

### 返回值

| 类型                                                    | 说明          |
| ------------------------------------------------------- | ------------- |
| `Promise<{ status, code?, message?, data?: { list } }>` | list 为 WGS84 |

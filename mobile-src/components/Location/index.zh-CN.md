---
group:
  title: 数据录入
  order: 2
order: 1
title: Location
toc: content
---

# Location

位置选择器组件，用于选择地理位置。

## Location.Combo

位置选择器组合组件，结合输入框和位置选择器。

### 何时使用

- 需要结合输入框和位置选择器时
- 需要显示和选择位置时

### 代码演示

<code src="./demos/LocationCombo.tsx"></code>

### API

#### 属性

| 属性                   | 说明         | 类型                                                   | 默认值    |
| ---------------------- | ------------ | ------------------------------------------------------ | --------- |
| value                  | 位置值       | `LocationValue \| null`                                | -         |
| placeholder            | 占位符       | `string`                                               | -         |
| type                   | 坐标类型     | `string`                                               | -         |
| cacheDuration           | 缓存过期时间 | `number`                                               | -         |
| mapConfig              | 地图配置     | `object`                                               | -         |
| autoSize               | 自动调整大小 | `boolean`                                              | -         |
| errorText              | 错误提示文本 | `string`                                               | -         |
| loadingText            | 加载提示文本 | `string`                                               | -         |
| allowClear             | 允许清除     | `boolean`                                              | -         |
| disabled               | 是否禁用     | `boolean`                                              | -         |
| editable               | 是否可编辑   | `boolean`                                              | -         |
| autoLocation           | 自动定位     | `boolean`                                              | -         |
| locationVisible        | 定位按钮可见 | `boolean`                                              | -         |
| chooseVisible          | 选择按钮可见 | `boolean \| { nearbyVisible?: boolean }`               | -         |
| previewVisible         | 预览按钮可见 | `boolean`                                              | -         |
| clickAction            | 点击动作     | `string`                                               | -         |
| className              | 自定义类名   | `string`                                               | -         |
| modalClassName         | 模态框类名   | `string`                                               | -         |
| modalStyle             | 模态框样式   | `CSSProperties`                                        | -         |
| getAddress             | 获取地址函数 | `((...args: unknown[]) => unknown) \| null`          | -         |
| getLocation            | 获取位置函数 | `((...args: unknown[]) => unknown) \| null`          | -         |
| portal                 | 挂载节点     | `HTMLElement \| null`                                  | -         |
| onChange               | 变化事件     | `((value: LocationValue \| null) => void) \| null`    | -         |
| onOpen                 | 打开事件     | `(() => void) \| null`                                 | -         |
| onClose                | 关闭事件     | `(() => void) \| null`                                 | -         |
| onLocationStatusChange | 定位状态变化 | `((status: string) => void) \| null`                  | -         |
| onError                | 错误事件     | `((error: { status: string; message: string }) => void) \| null` | -         |

#### Ref

| 属性       | 说明       | 类型                |
| ---------- | ---------- | ------------------- |
| element    | 根元素     | `unknown`           |
## Location.Modal

位置选择器模态框组件。

### 何时使用

- 需要以模态框形式显示位置选择器时
- 需要全屏显示地图选择时

### 代码演示

### API

#### 属性

| 属性           | 说明           | 类型                                     | 默认值 |
| -------------- | -------------- | ---------------------------------------- | ------ |
| value          | 位置值         | `LocationValue \| null`                  | -      |
| cacheDuration   | 缓存过期时间   | `number`                                 | -      |
| open           | 显示类型       | `string`                                 | -      |
| maskClosable   | 点击遮罩关闭   | `boolean`                                | -      |
| safeArea       | 是否安全区     | `boolean`                                | -      |
| allowClear     | 允许清除       | `boolean`                                | -      |
| multiple       | 是否多选       | `boolean`                                | -      |
| nearbyVisible  | 附近地点可见   | `boolean`                                | -      |
| modalClassName | 模态框类名     | `string`                                 | -      |
| modalStyle     | 模态框样式     | `object`                                 | -      |
| maskStyle      | 遮罩样式       | `object`                                 | -      |
| maskClassName  | 遮罩类名       | `string`                                 | -      |
| mapConfig      | 地图配置       | `object`                                 | -      |
| getAddress     | 获取地址函数   | `(...args) => unknown`                             | -      |
| getLocation    | 获取位置函数   | `(...args) => unknown`                             | -      |
| portal         | 挂载节点       | `Element \| null`                                  | -      |
| onOk           | 确认事件       | `((value: LocationValue \| null) => unknown) \| null` | -   |
| onChange       | 变化事件       | `((value: LocationValue \| null) => void) \| null` | -      |
| onClose        | 关闭事件       | `(() => void) \| null`                             | -      |

## Location.Main

位置选择器主组件。

### 何时使用

- 需要直接使用位置选择器主组件时
- 需要自定义位置选择界面时

### 代码演示

<code src="./demos/LocationMain.tsx"></code>

### API

#### 属性

| 属性          | 说明           | 类型                                     | 默认值 |
| ------------- | -------------- | ---------------------------------------- | ------ |
| value         | 位置值         | `LocationValue \| null`                  | -      |
| cacheDuration  | 缓存过期时间   | `number`                                 | -      |
| open          | 显示类型       | `string`                                 | -      |
| autoLocation  | 自动定位       | `boolean`                                | -      |
| nearbyVisible | 附近地点可见   | `boolean`                                | -      |
| id            | 位置选择器 ID  | `string`                                 | -      |
| mapConfig     | 地图配置       | `object`                                 | -      |
| getLocation   | 获取位置函数   | `(...args) => unknown`                          | -      |
| getAddress    | 获取地址函数   | `(...args) => unknown`                          | -      |
| style         | 自定义样式     | `CSSProperties`                                 | -      |
| className     | 自定义类名     | `string`                                        | -      |
| onChange      | 变化事件       | `(newValue: LocationValue \| null) => void`     | -      |
| onOk          | 确认事件       | `((value: LocationValue \| null) => void) \| null` | -   |
| onClear       | 清除事件       | `(() => void) \| null`                          | -      |

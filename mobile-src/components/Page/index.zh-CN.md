---
group:
  title: 布局
  order: 3
order: 1
title: Page
toc: content
---

# Page

页面容器组件，用于构建页面布局。

## Page

### 何时使用

- 需要构建页面布局时
- 需要页面级别的容器时
- 需要带安全区的页面时

### 代码演示

全屏

<code src="./demos/Page.tsx"></code>

非全屏

<code src="./demos/Flex.tsx" title="非全屏"></code>

### API

#### 属性

| 属性      | 说明       | 类型            | 默认值 |
| --------- | ---------- | --------------- | ------ |
| safeArea  | 是否安全区 | `boolean`       | -      |
| full      | 是否全屏   | `boolean`       | `true` |
| animation | 动画效果   | `string`        | -      |
| style     | 自定义样式 | `CSSProperties` | -      |
| className | 自定义类名 | `string`        | -      |
| children  | 页面内容   | `ReactNode`     | -      |

#### Ref

| 属性       | 说明       | 类型                        |
| ---------- | ---------- | --------------------------- |
| element    | 根元素     | `HTMLElement \| null`       |
## Page.Header

页面头部组件。

### 何时使用

- 需要在页面顶部显示标题、导航等内容时

### API

#### 属性

| 属性      | 说明       | 类型            | 默认值 |
| --------- | ---------- | --------------- | ------ |
| safeArea  | 是否安全区 | `boolean`       | -      |
| style     | 自定义样式 | `CSSProperties` | -      |
| className | 自定义类名 | `string`        | -      |
| children  | 头部内容   | `ReactNode`     | -      |

#### Ref

| 属性       | 说明       | 类型                        |
| ---------- | ---------- | --------------------------- |
| element    | 根元素     | `HTMLElement \| null`       |
## Page.Main

页面主体组件。

### 何时使用

- 需要在页面中间显示主要内容时

### 代码演示

<code src="./demos/Refresh.tsx"></code>

### API

#### 属性

| 属性                 | 说明         | 类型                                                            | 默认值 |
| -------------------- | ------------ | --------------------------------------------------------------- | ------ |
| threshold            | 触发阈值     | `number`                                                        | -      |
| touchStopPropagation | 触摸阻止冒泡 | `boolean`                                                       | -      |
| safeArea             | 是否安全区   | `boolean`                                                       | -      |
| style                | 自定义样式   | `CSSProperties`                                                 | -      |
| className            | 自定义类名   | `string`                                                        | -      |
| children             | 主体内容     | `ReactNode`                                                     | -      |
| onTopRefresh         | 顶部刷新     | `() => undefined \| Promise<boolean \| string \| undefined>`    | -      |
| onBottomRefresh      | 底部刷新     | `() => void \| Promise<boolean \| string \| undefined \| void>` | -      |
| onScroll             | 滚动事件     | `(e: UIEvent<HTMLElement>) => void`                             | -      |
| onScrollEnd          | 滚动结束     | `(e: UIEvent<HTMLElement>) => void`                             | -      |

#### Ref

| 属性       | 说明       | 类型                        |
| ---------- | ---------- | --------------------------- |
| element    | 根元素     | `HTMLElement \| null`       |
## Page.Footer

页面底部组件。

### 何时使用

- 需要在页面底部显示操作按钮、信息等内容时

### API

#### 属性

| 属性      | 说明       | 类型                          | 默认值 |
| --------- | ---------- | ----------------------------- | ------ |
| buttons   | 按钮配置   | `unknown`                     | -      |
| safeArea  | 是否安全区 | `boolean`                     | -      |
| style     | 自定义样式 | `CSSProperties`               | -      |
| className | 自定义类名 | `string`                      | -      |
| children  | 底部内容   | `ReactNode`                   | -      |
| onChange  | 变化事件   | `(newValue: unknown) => void` | -      |

#### Ref

| 属性       | 说明       | 类型                        |
| ---------- | ---------- | --------------------------- |
| element    | 根元素     | `HTMLElement \| null`       |
## Page.Aside

页面侧栏组件。

### 何时使用

- 需要在页面侧边显示内容时

### API

#### 属性

| 属性      | 说明       | 类型            | 默认值 |
| --------- | ---------- | --------------- | ------ |
| safeArea  | 是否安全区 | `boolean`       | -      |
| style     | 自定义样式 | `CSSProperties` | -      |
| className | 自定义类名 | `string`        | -      |
| children  | 侧栏内容   | `ReactNode`     | -      |

#### Ref

| 属性       | 说明       | 类型                        |
| ---------- | ---------- | --------------------------- |
| element    | 根元素     | `HTMLElement \| null`       |

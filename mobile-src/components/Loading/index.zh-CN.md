---
group:
  title: 反馈
  order: 4
order: 1
title: Loading
toc: content
---

# Loading

加载中组件，提供命令式 API 与多种加载动画子组件。

## Loading.open

### 何时使用

显示 loading

### 代码演示

<code src="./demos/LoadingApi.tsx"></code>

### API

#### 参数

同 [Loading](#loading) 组件属性。

##### 返回值

无返回值。

## Loading.close

### 何时使用

隐藏 Loading。

### 代码演示

见 Loading.open

### API

#### 参数

无参数。

#### 返回值

无返回值。

## Loading.exists

### 何时使用

检查 Loading 是否存在。

### 代码演示

见 Loading.open

### API

#### 参数

无参数。

#### 返回值

| 类型      | 说明             |
| --------- | ---------------- |
| `boolean` | 是否存在 Loading |

## Loading

### 何时使用

默认 Loading 组件

### 代码演示

<code src="./demos/Loading.tsx"></code>

### API

#### 属性

| 属性           | 说明       | 类型                          | 默认值 |
| -------------- | ---------- | ----------------------------- | ------ |
| content        | 提示内容   | `ReactNode`                   | -      |
| modalStyle     | 内容区样式 | `CSSProperties`               | -      |
| modalClassName | 内容区类名 | `string`                      | -      |
| maskStyle      | 遮罩样式   | `CSSProperties`               | -      |
| maskClassName  | 遮罩类名   | `string`                      | -      |
| portal         | 挂载节点   | `Element \| DocumentFragment` | -      |
| iconRender     | 图标渲染   | `() => ReactNode`             | -      |
| children       | 子元素     | `ReactNode`                   | -      |

#### Ref

| 属性       | 说明       | 类型                           |
| ---------- | ---------- | ------------------------------ |
| element    | 根元素     | `HTMLDivElement \| null`       |
## Loading.SpinFade

旋转淡入淡出加载动画组件。

### 何时使用

- 需要显示旋转淡入淡出加载动画时

### 代码演示

<code src="./demos/LoadingSpinFade.tsx"></code>

### API

同 [Loading](#loading) 组件属性。

## Loading.Ouroboros

衔尾蛇加载动画组件。

### 何时使用

- 需要显示衔尾蛇加载动画时

### 代码演示

<code src="./demos/LoadingOuroboros.tsx"></code>

### API

同 [Loading](#loading) 组件属性。

## Loading.BallWave

球波加载动画组件。

### 何时使用

- 需要显示球波加载动画时

### 代码演示

<code src="./demos/LoadingBallWave.tsx"></code>

### API

#### 属性

| 属性      | 说明       | 类型               | 默认值 |
| --------- | ---------- | ------------------ | ------ |
| color     | 颜色       | `string`           | -      |
| size      | 尺寸       | `LoadingIconSize \| string \| number` | -      |
| style     | 自定义样式 | `CSSProperties`    | -      |
| className | 自定义类名 | `string`           | -      |

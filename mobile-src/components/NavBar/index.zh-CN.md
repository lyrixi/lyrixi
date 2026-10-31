---
group:
  title: 导航
  order: 6
order: 1
title: NavBar
toc: content
---

# NavBar

导航栏组件，用于显示页面导航。

## NavBar

### 何时使用

- 需要显示页面导航时
- 需要显示标题和操作按钮时
- 需要在页面顶部显示导航栏时

### 代码演示

<code src="./demos/NavBar.tsx"></code>

### API

#### 属性

| 属性        | 说明         | 类型              | 默认值 |
| ----------- | ------------ | ----------------- | ------ |
| style       | 自定义样式   | `CSSProperties`   | -      |
| className   | 自定义类名   | `string`          | -      |
| title       | 标题         | `ReactNode`       | -      |
| children    | 导航栏内容   | `ReactNode`       | -      |
| leftRender  | 左侧区域渲染 | `() => ReactNode` | -      |
| rightRender | 右侧区域渲染 | `() => ReactNode` | -      |

#### Ref

NavBar 通过 `forwardRef` 暴露原生 DOM 引用。

| 属性 | 说明       | 类型             |
| ---- | ---------- | ---------------- |
| ref  | 根元素引用 | `HTMLDivElement` |

## NavBar.Title

导航栏标题组件。

### 何时使用

- 需要在导航栏中显示标题时

### API

#### 属性

| 属性      | 说明       | 类型            | 默认值 |
| --------- | ---------- | --------------- | ------ |
| style     | 自定义样式 | `CSSProperties` | -      |
| className | 自定义类名 | `string`        | -      |
| children  | 标题内容   | `ReactNode`     | -      |

#### Ref

| 属性    | 说明   | 类型             |
| ------- | ------ | ---------------- |
| element | 根元素 | `HTMLDivElement` |

## NavBar.Button

导航栏按钮组件。

### 何时使用

- 需要在导航栏中显示按钮时

### API

#### 属性

| 属性      | 说明       | 类型                                                                                                                  | 默认值   |
| --------- | ---------- | --------------------------------------------------------------------------------------------------------------------- | -------- |
| direction | 方向       | `string`                                                                                                              | -        |
| block     | 块级按钮   | `boolean`                                                                                                             | -        |
| variant   | 按钮变体   | `'solid' \| 'text' \| 'outlined' \| 'filled' \| 'dashed'`                                                             | `'text'` |
| color     | 按钮颜色   | `'default' \| 'secondary' \| 'tertiary' \| 'quaternary' \| 'primary' \| 'info' \| 'warning' \| 'danger' \| 'success'` | -        |
| size      | 尺寸       | `ButtonSize \| string \| number`                                                                                      | -        |
| square    | 等宽高     | `boolean`                                                                                                             | -        |
| fontSize  | 字体大小   | `string \| number`                                                                                                    | -        |
| radius    | 圆角       | `string \| number`                                                                                                    | -        |
| disabled  | 是否禁用   | `boolean`                                                                                                             | -        |
| style     | 自定义样式 | `CSSProperties`                                                                                                       | -        |
| className | 自定义类名 | `string`                                                                                                              | -        |
| children  | 按钮内容   | `ReactNode`                                                                                                           | -        |
| onClick   | 点击事件   | `MouseEventHandler<HTMLDivElement>`                                                                                   | -        |

#### Ref

| 属性    | 说明   | 类型                     |
| ------- | ------ | ------------------------ |
| element | 根元素 | `HTMLDivElement \| null` |

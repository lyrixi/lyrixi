---
group:
  title: 数据展示
  order: 5
order: 1
title: Skeleton
toc: content
---

# Skeleton

骨架屏组件，用于在内容加载时显示占位效果。包含基础块/段落/标签、以及列表/详情/编辑等整页骨架。

## 何时使用

- 需要显示加载占位效果时
- 需要在内容加载时显示骨架屏时
- 需要提升列表、详情、编辑等页面的加载体验时

## 代码演示

### Pages（整页骨架）

### Skeleton.List

列表页骨架，由多段 `Skeleton.Paragraph` 组成，适用于列表加载占位。

<code src="./demos/SkeletonList.tsx"></code>

#### API

| 属性       | 说明         | 类型                   | 默认值 |
| ---------- | ------------ | ---------------------- | ------ |
| listLength | 列表项数量   | `number`               | `8`    |
| itemLength | 每项段落行数 | `number`               | `2`    |
| animated   | 是否开启动画 | `boolean`              | -      |
| safeArea   | 是否安全区   | `boolean`              | -      |
| full       | 是否全屏     | `boolean`              | `true` |
| divider    | 段落分割样式 | `string`               | -      |
| animation  | 页面动画     | `string`               | -      |
| style      | 自定义样式   | `CSSProperties`        | -      |
| className  | 自定义类名   | `string`               | -      |

---

### Skeleton.Detail

详情页骨架，包含段落、Tabs、多段正文，适用于详情页加载占位。

<code src="./demos/SkeletonDetail.tsx"></code>

#### API

| 属性       | 说明           | 类型            | 默认值 |
| ---------- | -------------- | --------------- | ------ |
| listLength | 下方段落组数量 | `number`        | `2`    |
| itemLength | 每段正文行数   | `number`        | `10`   |
| animated   | 是否开启动画   | `boolean`       | -      |
| safeArea   | 是否安全区     | `boolean`       | -      |
| full       | 是否全屏       | `boolean`       | `true` |
| divider    | 段落分割样式   | `string`        | -      |
| animation  | 页面动画       | `string`        | -      |
| style      | 自定义样式     | `CSSProperties` | -      |
| className  | 自定义类名     | `string`        | -      |

---

### Skeleton.Edit

编辑页骨架，由多段带标题的段落组成，适用于表单/编辑页加载占位。

<code src="./demos/SkeletonEdit.tsx"></code>

#### API

| 属性       | 说明         | 类型            | 默认值 |
| ---------- | ------------ | --------------- | ------ |
| listLength | 段落组数量   | `number`        | `8`    |
| itemLength | 每段正文行数 | `number`        | `6`    |
| animated   | 是否开启动画 | `boolean`       | -      |
| safeArea   | 是否安全区   | `boolean`       | -      |
| full       | 是否全屏     | `boolean`       | `true` |
| divider    | 段落分割样式 | `string`        | -      |
| animation  | 页面动画     | `string`        | -      |
| style      | 自定义样式   | `CSSProperties` | -      |
| className  | 自定义类名   | `string`        | -      |

---

### Components（基础组件）

### Skeleton.Avatar

头像占位骨架，用于列表项左侧头像区域。

<code src="./demos/SkeletonAvatar.tsx"></code>

#### API

| 属性      | 说明         | 类型      | 默认值 |
| --------- | ------------ | --------- | ------ |
| animated  | 是否开启动画 | `boolean`       | `true` |
| style     | 自定义样式   | `CSSProperties` | -      |
| className | 自定义类名   | `string`        | -      |

#### Ref

| 属性       | 说明       | 类型                          |
| ---------- | ---------- | ----------------------------- |
| element    | 根元素     | `HTMLDivElement \| null`      |
---

### Skeleton.Title

标题占位骨架，用于段落或卡片的标题行。

<code src="./demos/SkeletonTitle.tsx"></code>

#### API

| 属性      | 说明         | 类型            | 默认值 |
| --------- | ------------ | --------------- | ------ |
| animated  | 是否开启动画 | `boolean`       | `true` |
| style     | 自定义样式   | `CSSProperties` | -      |
| className | 自定义类名   | `string`        | -      |

#### Ref

| 属性       | 说明       | 类型                          |
| ---------- | ---------- | ----------------------------- |
| element    | 根元素     | `HTMLDivElement \| null`      |
---

### Skeleton.Item

正文行占位骨架，用于段落中的单行正文。

<code src="./demos/SkeletonItem.tsx"></code>

#### API

| 属性      | 说明         | 类型            | 默认值 |
| --------- | ------------ | --------------- | ------ |
| animated  | 是否开启动画 | `boolean`       | `true` |
| style     | 自定义样式   | `CSSProperties` | -      |
| className | 自定义类名   | `string`        | -      |

#### Ref

| 属性       | 说明       | 类型                          |
| ---------- | ---------- | ----------------------------- |
| element    | 根元素     | `HTMLDivElement \| null`      |
---

### Skeleton.Paragraph

段落骨架，包含头像、标题、多行正文占位，常用于列表项或卡片。

<code src="./demos/SkeletonParagraph.tsx"></code>

#### API

| 属性            | 说明         | 类型            | 默认值   |
| --------------- | ------------ | --------------- | -------- |
| length          | 正文行数     | `number`        | `2`      |
| divider         | 分割样式     | `string`        | `'card'` |
| animated        | 是否开启动画 | `boolean`       | `true`   |
| avatarVisible   | 是否显示头像 | `boolean`       | `true`   |
| titleVisible    | 是否显示标题 | `boolean`       | `true`   |
| style           | 自定义样式   | `CSSProperties` | -        |
| className       | 自定义类名   | `string`        | -        |
| avatarClassName | 头像块类名   | `string`        | -        |
| avatarStyle     | 头像块样式   | `CSSProperties` | -        |
| titleClassName  | 标题块类名   | `string`        | -        |
| titleStyle      | 标题块样式   | `CSSProperties` | -        |
| itemClassName   | 正文行类名   | `string`        | -        |
| itemStyle       | 正文行样式   | `CSSProperties` | -        |
| oddClassName    | 奇数行类名   | `string`        | -        |
| oddStyle        | 奇数行样式   | `CSSProperties` | -        |
| evenClassName   | 偶数行类名   | `string`        | -        |
| evenStyle       | 偶数行样式   | `CSSProperties` | -        |

---

### Skeleton.Tabs

标签栏骨架，多块横向排列，常用于顶部 Tab 占位。

<code src="./demos/SkeletonTabs.tsx"></code>

#### API

| 属性         | 说明         | 类型            | 默认值 |
| ------------ | ------------ | --------------- | ------ |
| length       | 标签数量     | `number`        | `4`    |
| animated     | 是否开启动画 | `boolean`       | `true` |
| style        | 自定义样式   | `CSSProperties` | -      |
| className    | 自定义类名   | `string`        | -      |
| tabClassName | 单个标签类名 | `string`        | -      |
| tabStyle     | 单个标签样式 | `CSSProperties` | -      |

Tabs 使用 `forwardRef<HTMLDivElement>` 直接暴露 DOM 引用，无 `element` 属性。

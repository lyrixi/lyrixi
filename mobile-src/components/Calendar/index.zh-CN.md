---
group:
  title: 数据展示
  order: 5
order: 1
title: Calendar
toc: content
---

# Calendar

日历组件，用于显示和选择日期。
## Calendar

### 何时使用

- 需要显示日历时
- 需要选择日期时
- 需要选择日期范围时

### 代码演示

<code src="./demos/Calendar.tsx"></code>

### API

#### 属性

| 属性          | 说明         | 类型                                           | 默认值                       |
| ------------- | ------------ | ---------------------------------------------- | ---------------------------- |
| open          | 是否显示     | `boolean`                                      | -                            |
| value         | 选中的值     | `Date \| Date[]`                               | -                            |
| selectionMode | 选择模式     | `'single' \| 'multiple' \| 'range'`            | -                            |
| type          | 日历类型     | `'week' \| 'month'`                            | `'month'`                    |
| weekStart     | 周起始日     | `'Monday' \| 'Sunday'`                         | `'Monday'`                   |
| style         | 自定义样式   | `object`                                       | -                            |
| className     | 自定义类名   | `string`                                       | -                            |
| min           | 最小日期     | `Date`                                         | -                            |
| max           | 最大日期     | `Date`                                         | -                            |
| allowClear    | 允许清除     | `boolean`                                      | `true`                       |
| draggable     | 是否可拖动   | `boolean \| Array<'horizontal' \| 'vertical'>` | `['horizontal', 'vertical']` |
| titleRender   | 标题渲染     | `() => ReactNode`                              | -                            |
| headerRender  | 头部渲染     | `() => ReactNode`                              | -                            |
| dateRender    | 日期渲染     | `(date: Date, props: object) => ReactNode`     | -                            |
| onChange      | 变化事件     | `(value: Date \| Date[]) => void`              | -                            |
| onPageChange  | 页面变化事件 | `(date: Date) => void`                         | -                            |
| onError       | 错误事件     | `(error: Error) => void`                       | -                            |

#### Ref

| 属性          | 说明       | 类型                   |
| ------------- | ---------- | ---------------------- |
| element       | 根元素     | `HTMLDivElement`       |
| slideCollapse | 收起       | `() => Promise<void>`  |
| slideExpand   | 展开       | `() => Promise<void>`  |
| slidePrevious | 上一页     | `() => Promise<void>`  |
| slideNext     | 下一页     | `() => Promise<void>`  |

## Calendar.Header

日历头部组件。

### 何时使用

- 需要在日历中显示头部时

### 代码演示

<code src="./demos/CalendarHeader.tsx"></code>

### API

#### 属性

| 属性             | 说明       | 类型                      | 默认值 |
| ---------------- | ---------- | ------------------------- | ------ |
| style            | 自定义样式 | `object`                  | -      |
| className        | 自定义类名 | `string`                  | -      |
| children         | 头部内容   | `ReactNode`               | -      |
| onPreviousMonth  | 上一月     | `(e?: MouseEvent) => void` | -    |
| onNextMonth      | 下一月     | `(e?: MouseEvent) => void` | -    |
| onPreviousYear   | 上一年     | `(e?: MouseEvent) => void` | -    |
| onNextYear       | 下一年     | `(e?: MouseEvent) => void` | -    |

#### Ref

| 属性       | 说明       | 类型                   |
| ---------- | ---------- | ---------------------- |
| element    | 根元素     | `HTMLDivElement`       |

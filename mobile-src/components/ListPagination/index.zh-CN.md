---
group:
  title: 数据展示
  order: 5
order: 1
title: ListPagination
toc: content
---

# ListPagination

分页列表组件，提供分页数据列表的三种用法：内嵌列表（Main）、触发器+弹窗选择（Combo）、受控弹窗选择（Modal）。

## ListPagination.Main

内嵌分页列表，直接渲染在页面中。

### 何时使用

- 列表作为页面主体内容时
- 需要下拉刷新、上拉加载、缓存与重试时

### 代码演示

<code src="./demos/ListPaginationMain/index.tsx"></code>

### API

#### 属性

| 属性                  | 说明           | 类型                                                                | 默认值 |
| --------------------- | -------------- | ------------------------------------------------------------------- | ------ |
| cacheName             | 缓存名称       | `string`                                                            | -      |
| url                   | 数据接口地址   | `string`                                                            | -      |
| headers               | 请求头         | `Record<string, string>`                                            | -      |
| payload               | 查询参数       | `Record<string, unknown>`                                           | -      |
| pagination            | 分页配置       | `{ rows?: number }`                                                 | -      |
| formatPayload         | 格式化入参     | `(params: object) => object \| Promise<object>`                     | -      |
| formatResponse        | 格式化响应     | `(response: unknown, options: object) => object \| Promise<object>` | -      |
| initialLoad           | 是否初始加载   | `boolean`                                                           | -      |
| errorRetry            | 错误重试       | `boolean`                                                           | -      |
| emptyRetry            | 空状态重试     | `boolean`                                                           | -      |
| value                 | 选中的值       | `object \| object[] \| null`                                        | -      |
| list                  | 静态列表       | `Array<object>`                                                     | -      |
| formatViewItem        | 格式化项       | `(item: object, options: object) => object`                         | -      |
| multiple              | 是否多选       | `boolean`                                                           | -      |
| allowClear            | 允许清除       | `boolean`                                                           | -      |
| checkable             | 是否可选       | `boolean`                                                           | -      |
| itemStyle             | 项样式         | `object`                                                            | -      |
| itemClassName         | 项类名         | `string`                                                            | -      |
| itemLayout            | 项布局         | `string`                                                            | -      |
| checkboxVariant       | 复选框样式变体 | `string`                                                            | -      |
| checkboxPlacement     | 复选框位置     | `string`                                                            | -      |
| topRefreshEnabled     | 启用顶部刷新   | `boolean`                                                           | `true` |
| bottomRefreshEnabled  | 启用底部刷新   | `boolean`                                                           | `true` |
| virtual               | 是否虚拟滚动   | `boolean \| object`                                                 | -      |
| threshold             | 触发阈值       | `number`                                                            | -      |
| touchStopPropagation  | 触摸阻止冒泡   | `boolean`                                                           | -      |
| safeArea              | 是否安全区     | `boolean`                                                           | -      |
| style                 | 自定义样式     | `object`                                                            | -      |
| className             | 自定义类名     | `string`                                                            | -      |
| children              | 子元素         | `ReactNode`                                                         | -      |
| itemRender            | 自定义项渲染   | `(item: object, options: object) => ReactNode`                      | -      |
| loadingRender         | 加载中渲染     | `(options: object) => ReactNode`                                    | -      |
| loadingModalStyle     | 加载弹窗样式   | `object`                                                            | -      |
| loadingModalClassName | 加载弹窗类名   | `string`                                                            | -      |
| loadingMaskStyle      | 加载遮罩样式   | `object`                                                            | -      |
| loadingMaskClassName  | 加载遮罩类名   | `string`                                                            | -      |
| loadingPortal         | 加载挂载节点   | `HTMLElement`                                                       | -      |
| prependRender         | 前置渲染       | `(options: object) => ReactNode`                                    | -      |
| appendRender          | 后置渲染       | `(options: object) => ReactNode`                                    | -      |
| onChange              | 变化事件       | `(value: object \| object[] \| null, options?: object) => void`     | -      |
| onScroll              | 滚动事件       | `(e: UIEvent) => void`                                              | -      |
| onScrollEnd           | 滚动结束事件   | `(e: UIEvent) => void`                                              | -      |
| onTopRefresh          | 顶部刷新事件   | `() => void \| Promise<boolean \| string \| undefined>`             | -      |
| onBottomRefresh       | 底部刷新事件   | `() => void \| Promise<boolean \| string \| undefined \| void>`     | -      |
| onLoad                | 加载事件       | `(params: { result: object \| null; action: string }) => void`      | -      |

#### Ref

| 属性             | 说明            | 类型                                         |
| ---------------- | --------------- | -------------------------------------------- |
| element          | 根元素          | `HTMLElement`                                |
| scrollToLocation | 滚动到指定 Item | `(params: { id: string \| number }) => void` |
| reload           | 重新加载        | `(action?: string) => void`                  |
| getResult        | 获取结果        | `() => object \| null`                       |
| updateCache      | 更新缓存        | `(extraCache?: object) => void`              |
| clearCache       | 清除缓存        | `() => unknown`                              |
| getCache         | 获取缓存        | `() => unknown`                              |

## ListPagination.Combo

组合组件：输入框触发器 + 弹窗内分页列表选择。

### 何时使用

- 需要从分页接口中选择一项或多项，并展示在输入框时
- 与表单搭配、占位少、点击再加载列表时

### 代码演示

<code src="./demos/ListPaginationCombo/index.tsx"></code>

### API

#### 属性

| 属性                 | 说明         | 类型                                                                                                                                            | 默认值 |
| -------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| value                | 选中的值     | `ListPaginationItem \| ListPaginationItem[] \| null`                                                                                            | -      |
| placeholder          | 占位符       | `string`                                                                                                                                        | -      |
| formatter            | 展示格式化   | `(value: ListPaginationItem \| ListPaginationItem[] \| null, options?: { separator?: string }) => string`                                       | -      |
| autoSize             | 自动调整大小 | `boolean`                                                                                                                                       | -      |
| separator            | 多选时分隔符 | `string`                                                                                                                                        | -      |
| mode                 | 展示模式     | `string`                                                                                                                                        | -      |
| readOnly             | 只读         | `boolean`                                                                                                                                       | -      |
| disabled             | 禁用         | `boolean`                                                                                                                                       | -      |
| allowClear           | 允许清除     | `boolean`                                                                                                                                       | -      |
| style                | 自定义样式   | `CSSProperties`                                                                                                                                 | -      |
| className            | 自定义类名   | `string`                                                                                                                                        | -      |
| leftIconRender       | 左侧图标渲染 | `ReactNode`                                                                                                                                     | -      |
| leftIconSvg          | 左侧图标 SVG | `string`                                                                                                                                        | -      |
| rightIconRender      | 右侧图标渲染 | `ReactNode`                                                                                                                                     | -      |
| rightIconSvg         | 右侧图标 SVG | `string`                                                                                                                                        | -      |
| clearRender          | 清除按钮渲染 | `(props: object) => ReactNode`                                                                                                                  | -      |
| onClick              | 点击事件     | `(e: MouseEvent<HTMLDivElement>) => void`                                                                                                       | -      |
| list                 | 静态列表     | `ListPaginationItem[]`                                                                                                                          | -      |
| url                  | 数据接口地址 | `string`                                                                                                                                        | -      |
| headers              | 请求头       | `Record<string, string>`                                                                                                                        | -      |
| payload              | 查询参数     | `Record<string, unknown>`                                                                                                                       | -      |
| formatPayload        | 格式化入参   | `(params: Record<string, unknown>) => Promise<Record<string, unknown>> \| Record<string, unknown>`                                              | -      |
| formatResponse       | 格式化响应   | `(response, options) => Promise<{ status, code?, message?, data?: { list, totalPage?, totalRows? } }> \| ...`                                   | -      |
| formatViewItem       | 格式化项     | `(item: ListPaginationItem, options: { index: number }) => ListPaginationViewItem`                                                              | -      |
| maskClosable         | 点击遮罩关闭 | `boolean`                                                                                                                                       | -      |
| errorRetry           | 错误重试     | `boolean`                                                                                                                                       | -      |
| emptyRetry           | 空状态重试   | `boolean`                                                                                                                                       | -      |
| multiple             | 是否多选     | `boolean`                                                                                                                                       | -      |
| checkable            | 是否可选     | `boolean`                                                                                                                                       | -      |
| checkboxVariant      | 复选框样式   | `string`                                                                                                                                        | -      |
| checkboxPlacement    | 复选框位置   | `string`                                                                                                                                        | -      |
| topRefreshEnabled    | 启用顶部刷新 | `boolean`                                                                                                                                       | `true` |
| bottomRefreshEnabled | 启用底部刷新 | `boolean`                                                                                                                                       | `true` |
| virtual              | 是否虚拟滚动 | `ListAsyncVirtualProp`                                                                                                                          | -      |
| safeArea             | 是否安全区   | `boolean`                                                                                                                                       | -      |
| modalStyle           | 弹窗样式     | `CSSProperties`                                                                                                                                 | -      |
| modalClassName       | 弹窗类名     | `string`                                                                                                                                        | -      |
| maskStyle            | 遮罩样式     | `CSSProperties`                                                                                                                                 | -      |
| maskClassName        | 遮罩类名     | `string`                                                                                                                                        | -      |
| portal               | 挂载节点     | `HTMLElement \| null \| false`                                                                                                                  | -      |
| title                | 弹窗标题     | `ReactNode`                                                                                                                                     | -      |
| cancel               | 取消按钮     | `ReactNode`                                                                                                                                     | -      |
| cancelVisible        | 取消按钮可见 | `boolean`                                                                                                                                       | -      |
| headerRender         | 头部渲染     | `(options: { open?: boolean; value?: ListPaginationItem \| ListPaginationItem[] \| null; list?: ListPaginationItem[] }) => ReactNode`           | -      |
| itemRender           | 项渲染       | `(item: ListPaginationItem, options: { index: number; checked: boolean; onChange: (item: ListPaginationItem) => void }) => ReactNode`           | -      |
| loadingRender        | 加载中渲染   | `(options: { action?: string }) => ReactNode`                                                                                                   | -      |
| prependRender        | 前置渲染     | `(options: { list?: ListPaginationItem[]; value?: ListPaginationItem \| ListPaginationItem[] \| null; onChange?: (...) => void }) => ReactNode` | -      |
| appendRender         | 后置渲染     | `(options: { list?: ListPaginationItem[]; value?: ListPaginationItem \| ListPaginationItem[] \| null; onChange?: (...) => void }) => ReactNode` | -      |
| onOk                 | 确认事件     | `(value: ListPaginationItem \| ListPaginationItem[] \| null) => Promise<unknown \| false> \| unknown \| false`                                  | -      |
| onChange             | 变化事件     | `(newValue: ListPaginationItem \| ListPaginationItem[] \| null, options?: { action?: string; currentItem: ListPaginationItem }) => void`        | -      |
| onBeforeOpen         | 打开前事件   | `() => Promise<boolean \| undefined> \| boolean \| undefined`                                                                                   | -      |

#### Ref

| 属性    | 说明     | 类型             |
| ------- | -------- | ---------------- |
| element | 根元素   | `HTMLDivElement` |
| close   | 关闭弹窗 | `() => void`     |
| open    | 打开弹窗 | `() => void`     |

## ListPagination.Modal

受控弹窗内的分页列表选择。

### 何时使用

- 需要由外部控制弹窗显隐时
- 与自定义触发器、按钮等组合使用时

### 代码演示

<code src="./demos/ListPaginationModal/index.tsx"></code>

### API

#### 属性

同 [ListPagination.Main](#listpaginationmain) 组件属性，并额外支持：

| 属性           | 说明         | 类型                                                                                                                                  | 默认值 |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| open           | 是否显示     | `boolean`                                                                                                                             | -      |
| maskClosable   | 点击遮罩关闭 | `boolean`                                                                                                                             | -      |
| modalStyle     | 弹窗样式     | `CSSProperties`                                                                                                                       | -      |
| modalClassName | 弹窗类名     | `string`                                                                                                                              | -      |
| maskStyle      | 遮罩样式     | `CSSProperties`                                                                                                                       | -      |
| maskClassName  | 遮罩类名     | `string`                                                                                                                              | -      |
| portal         | 挂载节点     | `HTMLElement \| null \| false`                                                                                                        | -      |
| title          | 弹窗标题     | `ReactNode`                                                                                                                           | -      |
| cancel         | 取消按钮     | `ReactNode`                                                                                                                           | -      |
| cancelVisible  | 取消按钮可见 | `boolean`                                                                                                                             | -      |
| headerRender   | 头部渲染     | `(options: { open?: boolean; value?: ListPaginationItem \| ListPaginationItem[] \| null; list?: ListPaginationItem[] }) => ReactNode` | -      |
| onOk           | 确认事件     | `(value: ListPaginationItem \| ListPaginationItem[] \| null) => Promise<unknown \| false> \| unknown \| false`                        | -      |
| onClose        | 关闭事件     | `() => void`                                                                                                                          | -      |

#### Ref

| 属性             | 说明            | 类型                                         |
| ---------------- | --------------- | -------------------------------------------- |
| maskElement      | 遮罩元素        | `HTMLDivElement`                             |
| modalElement     | 模态框元素      | `HTMLDivElement`                             |
| element          | 列表根元素      | `HTMLElement`                                |
| scrollToLocation | 滚动到指定 Item | `(params: { id: string \| number }) => void` |
| reload           | 重新加载        | `(action?: string) => void`                  |
| getResult        | 获取结果        | `() => object \| null`                       |
| updateCache      | 更新缓存        | `(extraCache?: object) => void`              |
| clearCache       | 清除缓存        | `() => unknown`                              |
| getCache         | 获取缓存        | `() => unknown`                              |

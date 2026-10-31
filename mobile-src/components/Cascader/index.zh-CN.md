---
group:
  title: 数据录入
  order: 2
order: 1
title: Cascader
toc: content
---

# Cascader

级联选择器组件，用于从级联数据中选择。

## Cascader.Combo

级联选择器组合组件，结合输入框和级联选择器。

### 何时使用

- 需要结合输入框和级联选择器时

### 代码演示

<code src="./demos/CascaderCombo.tsx"></code>

### API

#### 属性

| 属性           | 说明         | 类型                                                                | 默认值 |
| -------------- | ------------ | ------------------------------------------------------------------- | ------ |
| value          | 选中的值     | `CascaderItem[] \| null`                                                       | -      |
| placeholder    | 占位符       | `string`                                                            | -      |
| formatter      | 格式化函数   | `(value: CascaderItem[] \| null, options?: { separator?: string }) => string`                                   | -      |
| autoSize       | 自动调整大小 | `boolean`                                                           | -      |
| separator      | 分隔符       | `string`                                                            | -      |
| mode           | 模式         | `string`                                                            | -      |
| readOnly       | 是否只读     | `boolean`                                                           | -      |
| disabled       | 是否禁用     | `boolean \| string[]`（Cascader.DistrictCombo 可传如 `['country','province','city','district','street']` 禁用层级） | -      |
| allowClear     | 允许清除     | `boolean`                                                           | -      |
| style          | 自定义样式   | `object`                                                            | -      |
| className      | 自定义类名   | `string`                                                            | -      |
| leftIconRender | 左侧图标渲染 | `() => ReactNode`                   | -      |
| leftIconSvg    | 左侧 SVG 图标 | `ComponentType<SVGProps<SVGSVGElement>>` | -      |
| rightIconRender| 右侧图标渲染 | `() => ReactNode`                   | -      |
| rightIconSvg   | 右侧 SVG 图标 | `ComponentType<SVGProps<SVGSVGElement>>` | -      |
| clearRender    | 清除按钮渲染 | `(props: object) => ReactNode`                                      | -      |
| list           | 级联数据     | `Array<{id: string, name: string, children?: Array}>`               | -      |
| loadData       | 加载数据函数 | `(tabs, options) => Promise<{ status, code?, message?, data?: { list?, async? } }>` | -      |
| maskClosable   | 点击遮罩关闭 | `boolean`                                                           | -      |
| safeArea       | 是否安全区   | `boolean`                                                           | -      |
| modalStyle     | 模态框样式   | `object`                                                            | -      |
| modalClassName | 模态框类名   | `string`                                                            | -      |
| maskStyle      | 遮罩样式     | `object`                                                            | -      |
| maskClassName  | 遮罩类名     | `string`                                                            | -      |
| portal         | 挂载节点     | `HTMLElement \| null \| false`                                      | -      |
| title          | 标题         | `ReactNode`                                                         | -      |
| ok         | 确认按钮     | `ReactNode`                                                         | -      |
| cancel     | 取消按钮     | `ReactNode`                                                         | -      |
| okVisible      | 确认按钮可见 | `boolean`                                                           | -      |
| cancelVisible  | 取消按钮可见 | `boolean`                                                           | -      |
| searchVisible  | 搜索可见     | `boolean`                                                           | -      |
| onBeforeOpen   | 打开前事件   | `() => boolean \| Promise<boolean>`                                            | -      |
| onChange       | 变化事件     | `(value: CascaderItem[]) => void`                                     | -      |
| onSearch       | 搜索事件     | `(keyword: string, ctx: { list: CascaderItem[] }) => void`          | -      |

#### Ref

| 属性       | 说明       | 类型                   |
| ---------- | ---------- | ---------------------- |
| element    | 根元素     | `HTMLDivElement`       |
| close      | 关闭选择器 | `() => void`           |
| open       | 打开选择器 | `() => void`           |

## Cascader.Modal

级联选择器模态框组件。

### 何时使用

- 需要以模态框形式显示级联选择器时

### 代码演示

<code src="./demos/CascaderModal.tsx"></code>

### API

#### 属性

| 属性           | 说明         | 类型                                                                | 默认值  |
| -------------- | ------------ | ------------------------------------------------------------------- | ------- |
| value          | 选中的值     | `CascaderItem[] \| null`                                            | -       |
| list           | 级联数据     | `CascaderItem[]`                                                    | -       |
| loadData       | 加载数据     | `(tabs, ctx) => Promise<LoadDataResult>`                            | -       |
| open           | 是否显示     | `boolean`                                                           | -       |
| maskClosable   | 点击遮罩关闭 | `boolean`                                                           | -       |
| allowClear     | 允许清除     | `boolean`                                                           | -       |
| safeArea       | 是否安全区   | `boolean`                                                           | -       |
| modalStyle     | 模态框样式   | `object`                                                            | -       |
| modalClassName | 模态框类名   | `string`                                                            | -       |
| maskStyle      | 遮罩样式     | `object`                                                            | -       |
| maskClassName  | 遮罩类名     | `string`                                                            | -       |
| portal         | 挂载节点     | `HTMLElement \| null \| false`                                      | -       |
| searchVisible  | 搜索可见     | `boolean`                                                           | -       |
| title          | 标题         | `ReactNode`                                                         | -       |
| ok         | 确认按钮     | `ReactNode`                                                         | -       |
| cancel     | 取消按钮     | `ReactNode`                                                         | -       |
| okVisible      | 确认按钮可见 | `boolean`                                                           | -       |
| cancelVisible  | 取消按钮可见 | `boolean`                                                           | -       |
| onClose        | 关闭事件     | `() => void`                                                        | -       |
| onOk           | 确认事件     | `(value: CascaderItem[] \| null \| undefined) => boolean \| Promise<unknown> \| void` | - |
| onSearch       | 搜索事件     | `(keyword: string, ctx: { list: CascaderItem[] }) => void`          | -       |
| onChange       | 变化事件     | `(value: CascaderItem[], options?: unknown) => void`                     | -       |

## Cascader.Main

级联选择器主组件。

### 何时使用

- 需要直接使用级联选择器主组件时

### 代码演示

<code src="./demos/CascaderMain.tsx"></code>

### API

#### 属性

| 属性           | 说明           | 类型                                                                 | 默认值 |
| -------------- | -------------- | -------------------------------------------------------------------- | ------ |
| value          | 选中的值       | `CascaderItem[]`                                                     | -      |
| list           | 级联数据       | `CascaderItem[]`                                                     | -      |
| loadData       | 加载数据       | `(tabs, ctx) => Promise<LoadDataResult>`                             | -      |
| listStyle      | 列表样式       | `object`                                                             | -      |
| listClassName  | 列表类名       | `string`                                                             | -      |
| itemStyle      | 项样式         | `object`                                                             | -      |
| itemClassName  | 项类名         | `string`                                                             | -      |
| searchVisible  | 搜索可见       | `boolean`                                                            | -      |
| tabbarRender   | 标签栏渲染     | `(params: { list; value; onChange }) => ReactNode`                   | -      |
| onSearch       | 搜索事件       | `(keyword: string, ctx: { list: CascaderItem[] }) => unknown`        | -      |
| onChange       | 变化事件       | `(value: CascaderItem[]) => void`                                    | -      |

#### Ref

| 属性           | 说明           | 类型                                      |
| -------------- | -------------- | ----------------------------------------- |
| mainElement    | 主元素         | `HTMLDivElement`                          |
| getMainElement | 获取主元素     | () => `HTMLDivElement`                    |
| update         | 更新选中值     | `(value, opts?: { action?: string }) => void` |

## Cascader.DistrictCombo

地区级联选择器组合组件。

### 何时使用

- 需要选择地区时
- 需要结合输入框和地区选择器时

### 代码演示

<code src="./demos/CascaderDistrictCombo.tsx"></code>

### API

#### 属性

同 [Cascader.Combo](#cascadercombo) 组件属性，额外增加以下属性：

| 属性               | 说明         | 类型                                      | 默认值 |
| ------------------ | ------------ | ----------------------------------------- | ------ |
| type               | 地区类型     | `string`                                  | -      |
| loadCountries      | 加载国家     | `() => Promise<DistrictResultState>`      | -      |
| loadCountryRegions | 加载省市区   | `(id?: string \| number) => Promise<DistrictResultState>` | - |
| loadStreets        | 加载街道     | `(id, ctx?) => Promise<DistrictResultState>` | -   |
| min                | 最小层级     | `string`                                  | -      |

#### Ref

同 Cascader.Combo 组件 Ref。

## Cascader.DistrictModal

地区级联选择器模态框组件。

### 何时使用

- 需要以模态框形式显示地区级联选择器时

### 代码演示

<code src="./demos/CascaderDistrictModal.tsx"></code>

### API

#### 属性

| 属性               | 说明         | 类型                                      | 默认值 |
| ------------------ | ------------ | ----------------------------------------- | ------ |
| value              | 选中的值     | `CascaderItem[] \| null`                  | -      |
| type               | 地区类型     | `string`                                  | -      |
| loadCountries      | 加载国家     | `() => Promise<DistrictResultState>`      | -      |
| loadCountryRegions | 加载省市区   | `(id?: string \| number) => Promise<DistrictResultState>` | - |
| loadStreets        | 加载街道     | `(id, ctx?) => Promise<DistrictResultState>` | -   |
| open               | 是否显示     | `boolean`                                 | -      |
| min                | 最小层级     | `string`                                  | -      |
| maskClosable       | 点击遮罩关闭 | `boolean`                                 | -      |
| safeArea           | 是否安全区   | `boolean`                                 | -      |
| listStyle          | 列表样式     | `object`                                  | -      |
| listClassName      | 列表类名     | `string`                                  | -      |
| itemStyle          | 项样式       | `object`                                  | -      |
| itemClassName      | 项类名       | `string`                                  | -      |
| modalStyle         | 模态框样式   | `object`                                  | -      |
| modalClassName     | 模态框类名   | `string`                                  | -      |
| maskStyle          | 遮罩样式     | `object`                                  | -      |
| maskClassName      | 遮罩类名     | `string`                                  | -      |
| portal             | 挂载节点     | `HTMLElement \| null \| false`            | -      |
| searchVisible      | 搜索可见     | `boolean`                                 | -      |
| title              | 标题         | `ReactNode`                               | -      |
| ok             | 确认按钮     | `ReactNode`                               | -      |
| cancel         | 取消按钮     | `ReactNode`                               | -      |
| cancelVisible      | 取消按钮可见 | `boolean`                                 | -      |
| onClose            | 关闭事件     | `() => void`                              | -      |
| onOk               | 确认事件     | `(value: CascaderItem[] \| null \| undefined) => boolean \| Promise<unknown> \| void` | - |
| onChange           | 变化事件     | `(value: CascaderItem[]) => void`         | -      |

## Cascader.DistrictMain

地区级联选择器主组件。

### 何时使用

- 需要直接使用地区级联选择器主组件时

### 代码演示

<code src="./demos/CascaderDistrictMain.tsx"></code>

### API

#### 属性

| 属性               | 说明         | 类型                                      | 默认值 |
| ------------------ | ------------ | ----------------------------------------- | ------ |
| open               | 是否显示     | `boolean`                                 | -      |
| value              | 选中的值     | `CascaderItem[] \| null`                  | -      |
| type               | 地区类型     | `string`                                  | -      |
| loadCountries      | 加载国家     | `() => Promise<DistrictResultState>`      | -      |
| loadCountryRegions | 加载省市区   | `(id?: string \| number) => Promise<DistrictResultState>` | - |
| loadStreets        | 加载街道     | `(id, ctx?) => Promise<DistrictResultState>` | -   |
| listStyle          | 列表样式     | `object`                                  | -      |
| listClassName      | 列表类名     | `string`                                  | -      |
| itemStyle          | 项样式       | `object`                                  | -      |
| itemClassName      | 项类名       | `string`                                  | -      |
| searchVisible      | 搜索可见     | `boolean`                                 | -      |
| onChange           | 变化事件     | `(value: CascaderItem[]) => void`         | -      |

---
group:
  title: 数据录入
  order: 2
order: 1
title: Input
toc: content
---

# Input

输入框组件，提供多种类型的输入控件。

## Input.Text

文本输入框组件，基于 Input 组件封装。

### 何时使用

- 需要单行文本输入时
- 需要带清除按钮的输入框时
- 需要格式化显示的输入框时

### 代码演示

<code src="./demos/InputText.tsx"></code>

### API

#### 属性

| 属性                  | 说明                        | 类型                                                                                   | 默认值   |
| --------------------- | --------------------------- | -------------------------------------------------------------------------------------- | -------- |
| id                    | 输入框 ID                   | `string`                                                                               | -        |
| name                  | 输入框名称                  | `string`                                                                               | -        |
| type                  | 输入类型                    | `'text' \| 'number' \| 'tel' \| 'password' \| 'search' \| 'textarea' \| 'autoSize'`    | `'text'` |
| value                 | 输入值                      | `string`                                                                               | `''`     |
| placeholder           | 占位符                      | `string`                                                                               | -        |
| formatter             | 格式化函数                  | `(value: string) => ReactNode`                                                         | -        |
| readOnly              | 是否只读                    | `boolean`                                                                              | -        |
| disabled              | 是否禁用                    | `boolean`                                                                              | -        |
| allowClear            | 允许清除                    | `boolean`                                                                              | -        |
| autoFocus             | 自动获取焦点                | `boolean`                                                                              | -        |
| autoSelect            | 自动选中                    | `boolean`                                                                              | -        |
| compositionEndEnabled | 仅输入法落字后触发 onChange | `boolean`                                                                              | `false`  |
| style                 | 自定义样式                  | `CSSProperties`                                                                        | -        |
| className             | 自定义类名                  | `string`                                                                               | -        |
| size                  | 输入框尺寸                  | `InputSize`                                                                            | `'xs'`   |
| leftIconRender        | 左侧图标渲染                | `() => ReactNode`                                                                      | -        |
| leftIconSvg           | 左侧 SVG 图标               | `ComponentType<SVGProps<SVGSVGElement>>`                                               | -        |
| rightIconRender       | 右侧图标渲染                | `() => ReactNode`                                                                      | -        |
| rightIconSvg          | 右侧 SVG 图标               | `ComponentType<SVGProps<SVGSVGElement>>`                                               | -        |
| clearRender           | 清除按钮                    | `(params: { clearable; allowClear; onClear; onTouchStart }) => ReactNode \| undefined` | -        |
| precision             | 小数精度                    | `number`                                                                               | -        |
| trim                  | 是否去除空格                | `boolean`                                                                              | -        |
| max                   | 最大值                      | `number`                                                                               | -        |
| min                   | 最小值                      | `number`                                                                               | -        |
| maxLength             | 最大长度                    | `number`                                                                               | -        |
| inputMode             | 输入模式                    | `string`                                                                               | -        |
| enterKeyHint          | 回车键提示                  | `string`                                                                               | -        |
| autoComplete          | 自动完成                    | `string`                                                                               | -        |
| autoCorrect           | 自动纠正                    | `string`                                                                               | -        |
| spellCheck            | 拼写检查                    | `boolean \| 'true' \| 'false'`                                                         | -        |
| cursor                | 是否显示光标                | `boolean \| null`                                                                      | -        |
| onClick               | 点击事件                    | `MouseEventHandler<HTMLDivElement>`                                                    | -        |
| onChange              | 值变化事件                  | `(value: string, options?: { action: string }) => void`                                | -        |
| onBlur                | 失焦事件                    | `FocusEventHandler<HTMLInputElement \| HTMLTextAreaElement>`                           | -        |
| onFocus               | 聚焦事件                    | `FocusEventHandler<HTMLInputElement \| HTMLTextAreaElement>`                           | -        |
| onKeyDown             | 按键事件                    | `KeyboardEventHandler<HTMLInputElement \| HTMLTextAreaElement>`                        | -        |
| onPressEnter          | 回车事件                    | `KeyboardEventHandler<HTMLInputElement \| HTMLTextAreaElement>`                        | -        |
| onCompositionStart    | 输入法开始                  | `CompositionEventHandler<HTMLInputElement \| HTMLTextAreaElement>`                     | -        |
| onCompositionUpdate   | 输入法更新                  | `CompositionEventHandler<HTMLInputElement \| HTMLTextAreaElement>`                     | -        |
| onCompositionEnd      | 输入法结束                  | `CompositionEventHandler<HTMLInputElement \| HTMLTextAreaElement>`                     | -        |

#### Ref

| 属性         | 说明       | 类型                       |
| ------------ | ---------- | -------------------------- |
| element      | 根元素     | `HTMLDivElement \| null`   |
| inputElement | 输入框元素 | `HTMLInputElement \| null` |
| correctValue | 矫正值     | `(value: any) => string`   |
| focus        | 获取焦点   | `() => void`               |
| blur         | 失去焦点   | `() => void`               |

## Input.Number

数字输入框组件。

### 何时使用

- 需要数字输入时
- 需要限制数字范围时
- 需要小数精度控制时

### 代码演示

<code src="./demos/InputNumber.tsx"></code>

### API

#### 属性

同 Input.Text 组件属性。

#### Ref

同 Input.Text 组件 Ref。

## Input.NumberBox

数字输入框组件，带增减按钮。

### 何时使用

- 需要数字输入且带增减按钮时
- 需要快速调整数值时

### 代码演示

<code src="./demos/InputNumberBox.tsx"></code>

### API

#### 属性

同 Input.Text 组件属性，以及：

| 属性           | 说明         | 类型        | 默认值 |
| -------------- | ------------ | ----------- | ------ |
| step           | 步进值       | `number`    | -      |
| stepFocus      | 步进后聚焦   | `boolean`   | -      |
| plusClassName  | 加号按钮类名 | `string`    | -      |
| plusStyle      | 加号按钮样式 | `object`    | -      |
| minusClassName | 减号按钮类名 | `string`    | -      |
| minusStyle     | 减号按钮样式 | `object`    | -      |
| children       | 自定义内容   | `ReactNode` | -      |

#### Ref

同 Input.Text 组件 Ref，以及：

| 属性        | 说明           | 类型                            |
| ----------- | -------------- | ------------------------------- |
| getInputRef | 获取 Input Ref | () => `RefObject<InputTextRef>` |

## Input.Node

非输入型展示节点，用于展示自定义内容（文本、按钮等），支持横向滚动、自增高、清除、禁用与只读。

### 何时使用

- 需要选择类/只读展示层（非原生 input）时
- 需要在输入框样式内展示自定义 ReactNode 时
- 需要配合数字键盘等自定义输入交互时

### 代码演示

<code src="./demos/InputNode.tsx"></code>

### API

#### 属性

| 属性            | 说明          | 类型                                                                                   | 默认值 |
| --------------- | ------------- | -------------------------------------------------------------------------------------- | ------ |
| id              | 节点 ID       | `string`                                                                               | -      |
| children        | 展示内容      | `ReactNode`                                                                            | -      |
| placeholder     | 占位符        | `string`                                                                               | -      |
| readOnly        | 是否只读      | `boolean`                                                                              | -      |
| disabled        | 是否禁用      | `boolean`                                                                              | -      |
| allowClear      | 允许清除      | `boolean`                                                                              | -      |
| autoSize        | 自增高换行    | `boolean`                                                                              | -      |
| style           | 自定义样式    | `CSSProperties`                                                                        | -      |
| className       | 自定义类名    | `string`                                                                               | -      |
| size            | 尺寸          | `InputSize`                                                                            | `'xs'` |
| leftIconRender  | 左侧图标渲染  | `() => ReactNode`                                                                      | -      |
| leftIconSvg     | 左侧 SVG 图标 | `ComponentType<SVGProps<SVGSVGElement>>`                                               | -      |
| rightIconRender | 右侧图标渲染  | `() => ReactNode`                                                                      | -      |
| rightIconSvg    | 右侧 SVG 图标 | `ComponentType<SVGProps<SVGSVGElement>>`                                               | -      |
| clearRender     | 清除按钮      | `(params: { clearable; allowClear; onClear; onTouchStart }) => ReactNode \| undefined` | -      |
| onClick         | 点击事件      | `(e: MouseEvent<HTMLDivElement>) => void`                                              | -      |
| onChange        | 清除时触发    | `(value: null, options?: { action: string }) => void`                                  | -      |

#### Ref

| 属性         | 说明     | 类型                     |
| ------------ | -------- | ------------------------ |
| element      | 根元素   | `HTMLDivElement \| null` |
| inputElement | 内容元素 | `HTMLDivElement \| null` |

## Input.NumberKeyboard

数字键盘输入框组件。

### 何时使用

- 需要数字键盘输入时
- 需要移动端数字输入优化时

### 代码演示

<code src="./demos/InputNumberKeyboard.tsx"></code>

### API

#### 属性

基于 Input.Text 展示层（`readOnly`），内置 `Keyboard.Number`。`value` 为 `string`，`onChange` 为 `(value: string) => void`。其余属性与 Input.Text 一致，以及：

| 属性     | 说明     | 类型                      | 默认值 |
| -------- | -------- | ------------------------- | ------ |
| ok       | 确认按钮 | `ReactNode \| null`       | `null` |
| value    | 输入值   | `string`                  | -      |
| onChange | 值变化   | `(value: string) => void` | -      |

#### Ref

同 Input.Text 组件 Ref（`focus` / `blur` 会打开 / 关闭数字键盘）。

## Input.Password

密码输入框组件。

### 何时使用

- 需要密码输入时
- 需要隐藏输入内容时

### 代码演示

<code src="./demos/InputPassword.tsx"></code>

### API

#### 属性

同 Input.Text 组件属性。

#### Ref

同 Input.Text 组件 Ref。

## Input.PasswordStrength

密码强度输入框组件。

### 何时使用

- 需要密码输入且显示强度时
- 需要密码强度验证时

### 代码演示

<code src="./demos/InputPasswordStrength.tsx"></code>

### API

#### 属性

| 属性      | 说明       | 类型     | 默认值 |
| --------- | ---------- | -------- | ------ |
| value     | 密码值     | `string` | -      |
| style     | 自定义样式 | `object` | -      |
| className | 自定义类名 | `string` | -      |

#### Ref

| 属性        | 说明         | 类型                            |
| ----------- | ------------ | ------------------------------- |
| element     | 根元素       | `HTMLUListElement`              |
| getStrength | 获取强度等级 | `(newValue?: string) => number` |

## Input.Search

搜索输入框组件。

### 何时使用

- 需要搜索输入时
- 需要搜索功能时

### 代码演示

<code src="./demos/InputSearch.tsx"></code>

### API

#### 属性

同 Input.Text 组件属性，以及：

| 属性          | 说明                                                                                      | 类型                      | 默认值 |
| ------------- | ----------------------------------------------------------------------------------------- | ------------------------- | ------ |
| debounceDelay | `onChange` 防抖延迟（毫秒），≤0 不防抖；开启后输入框用内部 state 即时展示，仅向外防抖通知 | `number`                  | -      |
| onSearch      | 搜索事件                                                                                  | `(value: string) => void` | -      |

#### Ref

同 Input.Text 组件 Ref。

## Input.Select

选择类输入框展示组件，用于列表选择控件的基础展示层（如 Select.Combo、Picker.Combo 等内部使用）。支持默认文本展示与 `tags` 标签模式。

### 何时使用

- 需要选择类控件的输入框展示时
- 需要以文本或标签形式展示选中值时

### 代码演示

<code src="./demos/InputSelect.tsx"></code>

### API

#### 属性

| 属性            | 说明          | 类型                                                                                   | 默认值 |
| --------------- | ------------- | -------------------------------------------------------------------------------------- | ------ |
| id              | 输入框 ID     | `string`                                                                               | -      |
| value           | 选中的值      | `InputSelectValue`                                                                     | -      |
| placeholder     | 占位符        | `string`                                                                               | -      |
| formatter       | 格式化函数    | `(value: InputSelectValue, options?: { separator?: string }) => string`                | -      |
| mode            | 展示模式      | `'tags' \| string`                                                                     | -      |
| autoSize        | 自动调整大小  | `boolean`                                                                              | -      |
| separator       | 多选分隔符    | `string`                                                                               | -      |
| readOnly        | 是否只读      | `boolean`                                                                              | -      |
| disabled        | 是否禁用      | `boolean`                                                                              | -      |
| allowClear      | 允许清除      | `boolean`                                                                              | -      |
| style           | 自定义样式    | `CSSProperties`                                                                        | -      |
| className       | 自定义类名    | `string`                                                                               | -      |
| size            | 输入框尺寸    | `InputSize`                                                                            | -      |
| leftIconRender  | 左侧图标渲染  | `() => ReactNode`                                                                      | -      |
| leftIconSvg     | 左侧 SVG 图标 | `ComponentType<SVGProps<SVGSVGElement>>`                                               | -      |
| rightIconRender | 右侧图标渲染  | `() => ReactNode`                                                                      | -      |
| rightIconSvg    | 右侧 SVG 图标 | `ComponentType<SVGProps<SVGSVGElement>>`                                               | -      |
| clearRender     | 清除按钮渲染  | `(params: { clearable; allowClear; onClear; onTouchStart }) => ReactNode \| undefined` | -      |
| onClick         | 点击事件      | `(e: MouseEvent<HTMLDivElement>, options?: { tag: ListItem }) => void`                 | -      |
| onChange        | 值变化事件    | `(value: InputSelectValue, options?: unknown) => void`                                 | -      |
| onAdd           | 添加事件      | `(e: MouseEvent<HTMLDivElement>) => void`                                              | -      |
| onEdit          | 编辑标签事件  | `(e: MouseEvent<HTMLDivElement>, options: { tag: ListItem }) => void`                  | -      |

#### Ref

| 属性            | 说明         | 类型                                      |
| --------------- | ------------ | ----------------------------------------- |
| displayValue    | 当前显示文本 | `string`                                  |
| getDisplayValue | 获取显示文本 | `(newValue?: InputSelectValue) => string` |
| element         | 根元素       | `HTMLElement \| null`                     |

## Input.Tel

电话输入框组件。

### 何时使用

- 需要电话输入时
- 需要电话号码格式化时

### 代码演示

<code src="./demos/InputTel.tsx"></code>

### API

#### 属性

同 Input.Text 组件属性。

#### Ref

同 Input.Text 组件 Ref。

## Input.Url

URL 输入框组件。

### 何时使用

- 需要 URL 输入时
- 需要网址输入时

### 代码演示

<code src="./demos/InputUrl.tsx"></code>

### API

#### 属性

同 Input.Text 组件属性，以及：

| 属性      | 说明     | 类型                                             | 默认值 |
| --------- | -------- | ------------------------------------------------ | ------ |
| onPreview | 预览事件 | `(value: string) => Promise<boolean> \| boolean` | -      |

#### Ref

同 Input.Text 组件 Ref。

## Input.Textarea

多行文本输入框组件。

### 何时使用

- 需要多行文本输入时
- 需要长文本输入时

### 代码演示

<code src="./demos/InputTextarea.tsx"></code>

### API

#### 属性

同 Input.Text 组件属性。

#### Ref

同 Input.Text 组件 Ref。

## Input.AutoSize

自适应高度输入框组件。

### 何时使用

- 需要自适应高度的输入框时
- 需要根据内容自动调整高度时

### 代码演示

<code src="./demos/InputAutoSize.tsx"></code>

### API

#### 属性

同 Input.Text 组件属性。

#### Ref

同 Input.Text 组件 Ref。

## Input.OTP

一次性密码输入框组件。

### 何时使用

- 需要一次性密码输入时
- 需要验证码输入时

### 代码演示

<code src="./demos/InputOTP.tsx"></code>

### API

#### 属性

| 属性       | 说明       | 类型                        | 默认值 |
| ---------- | ---------- | --------------------------- | ------ |
| type       | 输入类型   | `string`                    | -      |
| value      | 输入值     | `string[]`                  | -      |
| maxLength  | 最大长度   | `number`                    | -      |
| style      | 自定义样式 | `object`                    | -      |
| className  | 自定义类名 | `string`                    | -      |
| disabled   | 是否禁用   | `boolean`                   | -      |
| readOnly   | 是否只读   | `boolean`                   | -      |
| onChange   | 值变化事件 | `(value: string[]) => void` | -      |
| onComplete | 输入完成   | `(value: string[]) => void` | -      |

#### Ref

| 属性    | 说明     | 类型                           |
| ------- | -------- | ------------------------------ |
| element | 根元素   | `HTMLDivElement`               |
| focus   | 获取焦点 | `(itemIndex?: number) => void` |
| blur    | 失去焦点 | `() => void`                   |

## Input.Range

范围输入框组件。

### 何时使用

- 需要范围输入时
- 需要滑块输入时

### 代码演示

<code src="./demos/InputRange.tsx"></code>

### API

#### 属性

| 属性      | 说明       | 类型                      | 默认值 |
| --------- | ---------- | ------------------------- | ------ |
| id        | 输入框 ID  | `string`                  | -      |
| name      | 输入框名称 | `string`                  | -      |
| value     | 输入值     | `number`                  | -      |
| readOnly  | 是否只读   | `boolean`                 | -      |
| disabled  | 是否禁用   | `boolean`                 | -      |
| style     | 自定义样式 | `object`                  | -      |
| className | 自定义类名 | `string`                  | -      |
| min       | 最小值     | `number`                  | -      |
| max       | 最大值     | `number`                  | -      |
| step      | 步进值     | `number`                  | -      |
| onChange  | 值变化事件 | `(value: number) => void` | -      |

#### Ref

| 属性         | 说明       | 类型               |
| ------------ | ---------- | ------------------ |
| element      | 根元素     | `HTMLDivElement`   |
| inputElement | 输入框元素 | `HTMLInputElement` |

## Input.Rate

评分输入框组件。

### 何时使用

- 需要评分输入时
- 需要星级评分时

### 代码演示

<code src="./demos/InputRate.tsx"></code>

### API

#### 属性

| 属性       | 说明       | 类型                            | 默认值 |
| ---------- | ---------- | ------------------------------- | ------ |
| id         | 输入框 ID  | `string`                        | -      |
| name       | 输入框名称 | `string`                        | -      |
| value      | 评分值     | `number`                        | -      |
| readOnly   | 是否只读   | `boolean`                       | -      |
| disabled   | 是否禁用   | `boolean`                       | -      |
| style      | 自定义样式 | `object`                        | -      |
| className  | 自定义类名 | `string`                        | -      |
| iconRender | 图标渲染   | `(params: object) => ReactNode` | -      |
| min        | 最小值     | `number`                        | -      |
| max        | 最大值     | `number`                        | -      |
| step       | 步进值     | `number`                        | -      |
| onChange   | 值变化事件 | `(value: number) => void`       | -      |

#### Ref

| 属性         | 说明       | 类型               |
| ------------ | ---------- | ------------------ |
| element      | 根元素     | `HTMLDivElement`   |
| inputElement | 输入框元素 | `HTMLInputElement` |

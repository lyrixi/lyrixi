---
group:
  title: 数据录入
  order: 2
order: 1
title: Form
toc: content
---

# Form

表单组件，用于数据收集、校验和提交。

## Form

### 何时使用

- 需要收集用户输入数据时
- 需要对输入进行校验时
- 需要提交表单数据时

### 代码演示

#### 新增 / 编辑

<code src="./demos/FormEdit.tsx"></code>

#### 详情

<code src="./demos/FormDetail.tsx"></code>

### API

#### 属性

| 属性           | 说明           | 类型                                                     | 默认值           |
| -------------- | -------------- | -------------------------------------------------------- | ---------------- |
| label          | Label 列宽配置 | `{ span?: number \| 'auto' }`                            | `{ span: 8 }`    |
| content        | Field 列宽配置 | `{ span?: number \| 'auto' }`                            | `{ span: 16 }`   |
| style          | 自定义样式     | `CSSProperties`                                          | -                |
| className      | 自定义类名     | `string`                                                 | -                |
| children       | 表单内容       | `ReactNode`                                              | -                |
| onFieldsChange | 字段变化事件。仅用户修改表单控件时触发；`setFieldsValue` 不会触发 | `(changedFields: FieldData[], allFields: FieldData[]) => void` | -          |

通过 `ref` 调用表单方法：

```ts
const formRef = useRef<FormRef>(null)

<Form ref={formRef}>...</Form>

formRef.current?.getFieldsValue()
formRef.current?.validateFields()
```

### 代码演示

<code src="./demos/FormRef.tsx"></code>

#### 滚动到指定字段

<code src="./demos/FormScrollToField.tsx"></code>

| 方法              | 说明               | 类型                                                              |
| ----------------- | ------------------ | ----------------------------------------------------------------- |
| element           | 根 DOM 节点        | `HTMLDivElement \| null`                                          |
| getFieldValue     | 获取单个字段值     | `(name: string) => unknown`                                       |
| getFieldsValue    | 获取字段值         | `(nameList?: string[]) => Record<string, unknown>`                |
| setFieldsValue    | 设置字段值（不会触发 `onFieldsChange`） | `(values: Record<string, unknown>) => void`                       |
| validateFields    | 校验字段           | `(nameList?: string[]) => Promise<Record<string, unknown>>`       |
| scrollToField     | 滚动到指定字段     | `(name: string) => void`                                              |

校验失败时通过 `Toast.open` 展示第一条错误，不在字段下方展示。

## Form.Item

布局行，基于 `Row`。

### API

| 属性      | 说明       | 类型            | 默认值 |
| --------- | ---------- | --------------- | ------ |
| style     | 自定义样式 | `CSSProperties` | -      |
| className | 自定义类名 | `string`        | -      |
| children  | 内容       | `ReactNode`     | -      |

## Form.Label

标签列，基于 `Row.Col`。优先使用自身 `span`，未传时取 Form 的 `label.span`。

### API

| 属性      | 说明                         | 类型            | 默认值 |
| --------- | ---------------------------- | --------------- | ------ |
| span      | 列宽，覆盖 Form 的 label.span；传 `'auto'` 时为 `flex: 1` | `number \| 'auto'` | -   |
| style     | 自定义样式                   | `CSSProperties` | -      |
| className | 自定义类名                   | `string`        | -      |
| children  | 标签内容                     | `ReactNode`     | -      |

## Form.Field

字段列，基于 `Row.Col`。优先使用自身 `span`，未传时取 Form 的 `content.span`。通过 `cloneElement` 注入受控属性。

### API

| 属性           | 说明                           | 类型               | 默认值       |
| -------------- | ------------------------------ | ------------------ | ------------ |
| name           | 字段名                         | `string`           | -            |
| validator      | 校验函数                       | `FieldValidator`   | -            |
| valueName      | 值属性名                       | `string`           | `'value'`    |
| changeName     | 变更回调名                     | `string`           | `'onChange'` |
| span           | 列宽，覆盖 Form 的 content.span；传 `'auto'` 时为 `flex: 1` | `number \| 'auto'` | -         |
| style          | 自定义样式                     | `CSSProperties`    | -            |
| className      | 自定义类名                     | `string`           | -            |
| children       | 表单控件（也可为文本）         | `ReactNode`        | -            |

## FieldValidator

```ts
type FieldValidator = (value: unknown) => Promise<void>
```

`Promise.resolve()` 成功，`Promise.reject(new Error(message))` 失败。必填等规则直接用 `validator` 实现。

```ts
validator(value) {
  if (!value) {
    return Promise.reject(new Error('请输入用户名'))
  }
  return Promise.resolve()
}
```

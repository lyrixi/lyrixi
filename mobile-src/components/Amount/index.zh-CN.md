---
group:
  title: 数据展示
  order: 5
order: 2
title: Amount
toc: content
---

# Amount

金额展示组件，支持千分位、小数精度与货币符号。

## 何时使用

- 需要格式化展示金额、价格时
- 需要统一整数与小数样式（符号 / 整数 / 小数分块）时

## 代码演示

<code src="./demos/Amount.tsx"></code>

## API

### 属性

| 属性           | 说明                         | 类型               | 默认值 |
| -------------- | ---------------------------- | ------------------ | ------ |
| id             | 根元素 id                    | `string`           | -      |
| precision      | 小数位数                     | `number`           | `2`    |
| currencySymbol | 货币符号，显示在整数部分前   | `string`           | -      |
| style          | 自定义样式                   | `CSSProperties`    | -      |
| className      | 自定义类名                   | `string`           | -      |
| noStyle        | 为 true 时不使用分块样式类名 | `boolean`          | -      |
| children       | 金额数值                     | `number \| string` | -      |

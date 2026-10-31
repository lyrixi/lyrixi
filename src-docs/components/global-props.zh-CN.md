---
group:
  title: 通用
  order: 0
order: 3
title: 通用属性方法
toc: content
---

# 属性与方法

## 全局属性

全局属性定义和使用

| 属性名         | 说明               | 值                                                                                             | 默认值 |
| -------------- | ------------------ | ---------------------------------------------------------------------------------------------- | ------ |
| value          | 单选值             | {id:'', name: ''}                                                                              | Empty  |
| value          | 多选值             | [{id:'', name: ''}]                                                                            | Empty  |
| list           | 列表               | [{id:'', name: ''}]                                                                            | Empty  |
| list           | 文件列表           | [{fileUrl:'', fileThumbnail: '', filePath: '', fileName: '', fileSize: '', localFilePath: ''}] | Empty  |
| multiple       | 多选               | true/false                                                                                     | false  |
| disabled       | 禁用               | true/false                                                                                     | false  |
| readOnly       | 只读               | true/false                                                                                     | false  |
| checked        | 选中状态           | true/false                                                                                     | false  |
| allowClear     | 是否允许清空       | true/false                                                                                     | false  |
| comboStyle     | 复合框 style       | Empty                                                                                          | Empty  |
| comboClassName | 复合框 className   | Empty                                                                                          | Empty  |
| modalStyle     | 弹窗 style         | Empty                                                                                          | Empty  |
| modalClassName | 弹窗 className     | Empty                                                                                          | Empty  |
| maskStyle      | 弹窗遮罩 style     | Empty                                                                                          | Empty  |
| maskClassName  | 弹窗遮罩 className | Empty                                                                                          | Empty  |
| maskClosable   | 允许点击遮罩隐藏   | true/false                                                                                     | true   |
| xxRender       | 子组件渲染         | function ()                                                                                    | Empty  |

## 出参及变量

| 属性名 | 说明 | 值                                                                               | 默认值 |
| ------ | ---- | -------------------------------------------------------------------------------- | ------ |
| Result | 结果 | {status: 'error/success/empty/noMore/loading/uploading/choose', message: string} | Empty  |

## 全局事件

| 方法名       | 说明             | 出参   | 默认值 |
| ------------ | ---------------- | ------ | ------ |
| onSelect     | 组合控件内部修改 | value  | Empty  |
| onChange     | 修改             | value  | Empty  |
| onClose      | 点击关闭事件     | Empty  | Empty  |
| onBeforeOpen | 点击打开事件之前 | Empty  | Empty  |
| onOpen       | 点击打开事件     | Empty  | Empty  |
| onError      | 错误事件         | Result | Empty  |
| onSuccess    | 成功事件         | Result | Empty  |
| onCancel     | 取消事件         | Empty  | Empty  |
| onLoad       | 加载事件         | Result | Empty  |
| onOk         | 确定事件         | Empty  | Empty  |
| onCancel     | 取消事件         | Empty  | Empty  |

## 全局方法

| 方法名 | 说明       | 示例                                    |
| ------ | ---------- | --------------------------------------- |
| open   | 打开模态框 | Message.open,Toast.open,Loading.open    |
| close  | 关闭模态框 | Message.close,Toast.close,Loading.close |

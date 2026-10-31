---
group:
  title: 数据展示
  order: 5
order: 1
title: WebView
toc: content
---

# WebView

内联框架组件，用于嵌入其他页面。

## 何时使用

- 需要嵌入其他页面时
- 需要显示外部内容时
- 需要隔离内容时

## 使用方法

```bash
const webViewRef = useRef(null)

<WebView
  ref={webViewRef}
  src={`目标页面`}
  data={{
    onOk: (result, { historyCount } = {}) => {
      if (typeof historyCount === 'number') {
        webViewRef.current?.element?.contentWindow?.history?.go(-historyCount)
      }
      setTimeout(() => {
        onOk && onOk(result)
      }, 100)
    }
  }}
/>
```

目标页面

```bash
// 对接客户控件的新增客户场景
if (typeof window.frameElement?.data?.onOk === 'function') {
  window.frameElement.data.onOk('', { historyCount: 2 })
  return
}
```

## API

### 属性

| 属性           | 说明         | 类型                                                            | 默认值 |
| -------------- | ------------ | --------------------------------------------------------------- | ------ |
| src            | 页面地址     | `string`                                                        | -      |
| data           | 数据         | `unknown`                                                       | -      |
| onLoadStart    | 开始加载回调 | `(result: { status: 'success'; message?: string }) => void`    | -      |
| onLoadSuccess  | 加载成功回调 | `(result: { status: 'success'; message?: string }) => void`    | -      |
| onLoadError    | 加载失败回调 | `(result: { status: 'error'; message?: string }) => void`      | -      |
| style          | 自定义样式   | `CSSProperties`                                                 | -      |
| className      | 自定义类名   | `string`                                                        | -      |

### Ref

| 属性    | 说明   | 类型                        |
| ------- | ------ | --------------------------- |
| element | 根元素 | `HTMLIFrameElement \| null` |

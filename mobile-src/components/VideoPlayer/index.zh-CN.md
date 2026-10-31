---
group:
  title: 数据展示
  order: 5
order: 1
title: VideoPlayer
toc: content
---

# VideoPlayer

视频播放器组件，用于播放视频。

## 何时使用

- 需要播放视频时
- 需要显示视频播放器时
- 需要控制视频播放时

## 代码演示

<code src="./demos/VideoPlayer.tsx"></code>

## API

### 属性

| 属性         | 说明       | 类型                                                          | 默认值  |
| ------------ | ---------- | ------------------------------------------------------------- | ------- |
| src          | 视频地址   | `string`                                                      | -       |
| autoPlay     | 自动播放   | `boolean`                                                     | `false` |
| style        | 自定义样式 | `CSSProperties`                                               | -       |
| className    | 自定义类名 | `string`                                                      | -       |
| portal       | 挂载节点   | `Element`                                                     | -       |
| poster       | 封面图     | `string`                                                      | -       |
| children     | 子元素     | `ReactNode`                                                   | -       |
| headerRender | 自定义头部 | `() => ReactNode`                                             | -       |
| onError      | 错误事件   | `(err: { status: string; message: string; error: unknown }) => void` | -       |

### Ref

| 属性       | 说明       | 类型                   |
| ---------- | ---------- | ---------------------- |
| element    | 根元素     | `HTMLDivElement \| null` |
| pause      | 暂停播放   | `() => void`           |
| play       | 开始播放   | `() => void`           |

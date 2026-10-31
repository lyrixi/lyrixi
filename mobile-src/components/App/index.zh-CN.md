---
group:
  title: 通用
  order: 1
order: 1
title: App
toc: content
---

# App

应用组件，用于应用初始化和配置。

## 何时使用

- 需要应用初始化时
- 需要配置全局设置时
- 需要启用日志、调试等功能时


## API

### 属性

| 属性          | 说明           | 类型                                                                               | 默认值 |
| ------------- | -------------- | ---------------------------------------------------------------------------------- | ------ |
| preload       | 预加载函数     | `(() => Promise<{ status: string; message?: string }>) \| null`                    | `null` |
| language      | 语言配置       | `string \| null`                                                                    | `null` |
| themeName     | 主题名，调用 `Theme.setTheme` | `string`                                                                           | `default` |
| children      | 应用内容       | `ReactNode`                                                                         | -      |

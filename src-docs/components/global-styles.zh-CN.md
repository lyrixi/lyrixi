---
group:
  title: 通用
  order: 1
order: 2
title: 全局样式
toc: content
---

# 全局样式

## 色彩

完整的颜色系统，包括文字颜色、背景颜色、语义化颜色等

### 文字颜色

| 类名                        | 说明           | 变量                             |
| --------------------------- | -------------- | -------------------------------- |
| `.lyrixi-color-white`       | 白色文字       | `white`                          |
| `.lyrixi-color-disabled`    | 禁用状态文字   | `--lyrixi-font-color-disabled`   |
| `.lyrixi-color-default`     | 默认文字颜色   | `--lyrixi-font-color-default`    |
| `.lyrixi-color-auxiliary`   | 辅助文字颜色   | `--lyrixi-font-color-tertiary`   |
| `.lyrixi-color-secondary`   | 次要文字颜色   | `--lyrixi-font-color-secondary`  |
| `.lyrixi-color-tertiary`    | 三级文字颜色   | `--lyrixi-font-color-tertiary`   |
| `.lyrixi-color-placeholder` | 占位符文字颜色 | `--lyrixi-font-color-quaternary` |
| `.lyrixi-color-primary`     | 主题色文字     | `--lyrixi-primary`               |
| `.lyrixi-color-link`        | 链接文字颜色   | `--lyrixi-link`                  |
| `.lyrixi-color-warning`     | 警告文字颜色   | `--lyrixi-warning`               |
| `.lyrixi-color-danger`      | 危险文字颜色   | `--lyrixi-danger`                |
| `.lyrixi-color-success`     | 成功文字颜色   | `--lyrixi-success`               |

### 背景颜色

| 类名                         | 说明           | 变量                           |
| ---------------------------- | -------------- | ------------------------------ |
| `.lyrixi-bg-transparent`     | 透明背景       | `transparent`                  |
| `.lyrixi-bg-white`           | 白色背景       | `white`                        |
| `.lyrixi-bg-body`            | 页面背景色     | `--lyrixi-bg-default`          |
| `.lyrixi-bg-disabled`        | 禁用状态背景   | `--lyrixi-font-color-disabled` |
| `.lyrixi-bg-primary`         | 主题色背景     | `--lyrixi-primary`             |
| `.lyrixi-bg-primary-lighten` | 主题色浅色背景 | `--lyrixi-primary-lighten`     |
| `.lyrixi-bg-link`            | 链接背景色     | `--lyrixi-link`                |
| `.lyrixi-bg-warning`         | 警告背景色     | `--lyrixi-warning`             |
| `.lyrixi-bg-danger`          | 危险背景色     | `--lyrixi-danger`              |
| `.lyrixi-bg-success`         | 成功背景色     | `--lyrixi-success`             |

## 字体

字体大小、字体粗细、文本处理等

### 字体大小

| 类名                    | 说明     | 变量                     |
| ----------------------- | -------- | ------------------------ |
| `.lyrixi-font-size-xxl` | 超大字体 | `--lyrixi-font-size-xxl` |
| `.lyrixi-font-size-xl`  | 大字体   | `--lyrixi-font-size-xl`  |
| `.lyrixi-font-size-l`   | 较大字体 | `--lyrixi-font-size-l`   |
| `.lyrixi-font-size-m`   | 中等字体 | `--lyrixi-font-size-m`   |
| `.lyrixi-font-size-s`   | 小字体   | `--lyrixi-font-size-s`   |
| `.lyrixi-font-size-xs`  | 超小字体 | `--lyrixi-font-size-xs`  |

### 字体粗细

| 类名                         | 说明     | 值     |
| ---------------------------- | -------- | ------ |
| `.lyrixi-font-weight-bold`   | 粗体     | `bold` |
| `.lyrixi-font-weight-medium` | 中等粗细 | `500`  |

### 文本对齐

| 类名                  | 说明     | 值                  |
| --------------------- | -------- | ------------------- |
| `.lyrixi-text-center` | 居中对齐 | `text-align:center` |
| `.lyrixi-text-right`  | 右对齐   | `text-align:right`  |
| `.lyrixi-text-left`   | 左对齐   | `text-align:left`   |

### 文本处理

| 类名               | 说明             | 功能                      |
| ------------------ | ---------------- | ------------------------- |
| `.lyrixi-ellipsis` | 省略号           | `text-overflow: ellipsis` |
| `.lyrixi-nowrap`   | 单行省略         | 单行文本省略号            |
| `.lyrixi-nowrap1`  | 单行省略（兼容） | 单行文本省略号            |
| `.lyrixi-nowrap2`  | 两行省略         | 两行文本省略号            |
| `.lyrixi-nowrap3`  | 三行省略         | 三行文本省略号            |

## 圆角

6 个层级的圆角规范

| 类名                 | 说明     | 变量                  |
| -------------------- | -------- | --------------------- |
| `.lyrixi-radius-xl`  | 超大圆角 | `--lyrixi-radius-xl`  |
| `.lyrixi-radius-l`   | 大圆角   | `--lyrixi-radius-l`   |
| `.lyrixi-radius-m`   | 中等圆角 | `--lyrixi-radius-m`   |
| `.lyrixi-radius-s`   | 小圆角   | `--lyrixi-radius-s`   |
| `.lyrixi-radius-xs`  | 超小圆角 | `--lyrixi-radius-xs`  |
| `.lyrixi-radius-xxs` | 极小圆角 | `--lyrixi-radius-xxs` |

## 间距

8 个层级的间距系统，包括内边距和外边距

### 内边距（Padding）

#### 水平内边距

| 类名                              | 说明             | 变量                  |
| --------------------------------- | ---------------- | --------------------- |
| `.lyrixi-padding-horizontal-xxl`  | 超大水平内边距   | `--lyrixi-space-xxl`  |
| `.lyrixi-padding-horizontal-xl`   | 大水平内边距     | `--lyrixi-space-xl`   |
| `.lyrixi-padding-horizontal-l`    | 较大水平内边距   | `--lyrixi-space-l`    |
| `.lyrixi-padding-horizontal-m`    | 中等水平内边距   | `--lyrixi-space-m`    |
| `.lyrixi-padding-horizontal-s`    | 小水平内边距     | `--lyrixi-space-s`    |
| `.lyrixi-padding-horizontal-xs`   | 超小水平内边距   | `--lyrixi-space-xs`   |
| `.lyrixi-padding-horizontal-xss`  | 极小水平内边距   | `--lyrixi-space-xss`  |
| `.lyrixi-padding-horizontal-xxxs` | 超极小水平内边距 | `--lyrixi-space-xxxs` |

#### 垂直内边距

| 类名                            | 说明             | 变量                  |
| ------------------------------- | ---------------- | --------------------- |
| `.lyrixi-padding-vertical-xxl`  | 超大垂直内边距   | `--lyrixi-space-xxl`  |
| `.lyrixi-padding-vertical-xl`   | 大垂直内边距     | `--lyrixi-space-xl`   |
| `.lyrixi-padding-vertical-l`    | 较大垂直内边距   | `--lyrixi-space-l`    |
| `.lyrixi-padding-vertical-m`    | 中等垂直内边距   | `--lyrixi-space-m`    |
| `.lyrixi-padding-vertical-s`    | 小垂直内边距     | `--lyrixi-space-s`    |
| `.lyrixi-padding-vertical-xs`   | 超小垂直内边距   | `--lyrixi-space-xs`   |
| `.lyrixi-padding-vertical-xss`  | 极小垂直内边距   | `--lyrixi-space-xss`  |
| `.lyrixi-padding-vertical-xxxs` | 超极小垂直内边距 | `--lyrixi-space-xxxs` |

### 外边距（Margin）

#### 水平外边距

| 类名                             | 说明             | 变量                  |
| -------------------------------- | ---------------- | --------------------- |
| `.lyrixi-margin-horizontal-xxl`  | 超大水平外边距   | `--lyrixi-space-xxl`  |
| `.lyrixi-margin-horizontal-xl`   | 大水平外边距     | `--lyrixi-space-xl`   |
| `.lyrixi-margin-horizontal-l`    | 较大水平外边距   | `--lyrixi-space-l`    |
| `.lyrixi-margin-horizontal-m`    | 中等水平外边距   | `--lyrixi-space-m`    |
| `.lyrixi-margin-horizontal-s`    | 小水平外边距     | `--lyrixi-space-s`    |
| `.lyrixi-margin-horizontal-xs`   | 超小水平外边距   | `--lyrixi-space-xs`   |
| `.lyrixi-margin-horizontal-xss`  | 极小水平外边距   | `--lyrixi-space-xss`  |
| `.lyrixi-margin-horizontal-xxxs` | 超极小水平外边距 | `--lyrixi-space-xxxs` |

#### 垂直外边距

| 类名                           | 说明             | 变量                  |
| ------------------------------ | ---------------- | --------------------- |
| `.lyrixi-margin-vertical-xxl`  | 超大垂直外边距   | `--lyrixi-space-xxl`  |
| `.lyrixi-margin-vertical-xl`   | 大垂直外边距     | `--lyrixi-space-xl`   |
| `.lyrixi-margin-vertical-l`    | 较大垂直外边距   | `--lyrixi-space-l`    |
| `.lyrixi-margin-vertical-m`    | 中等垂直外边距   | `--lyrixi-space-m`    |
| `.lyrixi-margin-vertical-s`    | 小垂直外边距     | `--lyrixi-space-s`    |
| `.lyrixi-margin-vertical-xs`   | 超小垂直外边距   | `--lyrixi-space-xs`   |
| `.lyrixi-margin-vertical-xss`  | 极小垂直外边距   | `--lyrixi-space-xss`  |
| `.lyrixi-margin-vertical-xxxs` | 超极小垂直外边距 | `--lyrixi-space-xxxs` |

### 通用内边距

| 类名              | 说明       | 值                                            |
| ----------------- | ---------- | --------------------------------------------- |
| `.lyrixi-padding` | 通用内边距 | `var(--lyrixi-space-m) var(--lyrixi-space-l)` |

## 布局

基于 Flexbox 的完整布局系统

### 基础 Flex 类

| 类名                  | 说明         | 值                     |
| --------------------- | ------------ | ---------------------- |
| `.lyrixi-flex`        | Flexbox 布局 | `display: flex`        |
| `.lyrixi-inline-flex` | 行内 Flexbox | `display: inline-flex` |

### Flex 属性

| 类名                   | 说明           | 值                |
| ---------------------- | -------------- | ----------------- |
| `.lyrixi-flex-initial` | 初始值         | `flex: initial`   |
| `.lyrixi-flex-0`       | 不伸缩         | `flex: 0`         |
| `.lyrixi-flex-none`    | 不伸缩且不收缩 | `flex: none`      |
| `.lyrixi-flex-1`       | 等分剩余空间   | `flex: 1`         |
| `.lyrixi-flex-wrap`    | 换行           | `flex-wrap: wrap` |

### 方向控制

| 类名                              | 说明     | 值                               |
| --------------------------------- | -------- | -------------------------------- |
| `.lyrixi-flex-vertical`           | 垂直布局 | `flex-direction: column`         |
| `.lyrixi-flex-horizontal`         | 水平布局 | `flex-direction: row`            |
| `.lyrixi-flex-vertical-reverse`   | 垂直反向 | `flex-direction: column-reverse` |
| `.lyrixi-flex-horizontal-reverse` | 水平反向 | `flex-direction: row-reverse`    |

### 主轴对齐（水平对齐）

| 类名                   | 说明     | 值                               |
| ---------------------- | -------- | -------------------------------- |
| `.lyrixi-flex-left`    | 左对齐   | `justify-content: flex-start`    |
| `.lyrixi-flex-center`  | 居中对齐 | `justify-content: center`        |
| `.lyrixi-flex-right`   | 右对齐   | `justify-content: flex-end`      |
| `.lyrixi-flex-between` | 两端对齐 | `justify-content: space-between` |
| `.lyrixi-flex-around`  | 环绕对齐 | `justify-content: space-around`  |

### 交叉轴对齐（垂直对齐）

| 类名                    | 说明     | 值                        |
| ----------------------- | -------- | ------------------------- |
| `.lyrixi-flex-top`      | 顶部对齐 | `align-items: flex-start` |
| `.lyrixi-flex-middle`   | 垂直居中 | `align-items: center`     |
| `.lyrixi-flex-bottom`   | 底部对齐 | `align-items: flex-end`   |
| `.lyrixi-flex-stretch`  | 拉伸对齐 | `align-items: stretch`    |
| `.lyrixi-flex-baseline` | 基线对齐 | `align-items: baseline`   |

### 组合对齐

| 类名                        | 说明     | 功能             |
| --------------------------- | -------- | ---------------- |
| `.lyrixi-flex-middlecenter` | 完全居中 | 水平和垂直都居中 |

### 自身对齐

| 类名                        | 说明         | 值                       |
| --------------------------- | ------------ | ------------------------ |
| `.lyrixi-flex-self-stretch` | 自身拉伸     | `align-self: stretch`    |
| `.lyrixi-flex-self-top`     | 自身顶部对齐 | `align-self: flex-start` |
| `.lyrixi-flex-self-middle`  | 自身垂直居中 | `align-self: center`     |
| `.lyrixi-flex-self-bottom`  | 自身底部对齐 | `align-self: flex-end`   |

## 显示与隐藏

| 类名                       | 说明           | 值                              |
| -------------------------- | -------------- | ------------------------------- |
| `.lyrixi-hide`             | 隐藏元素       | `display: none`                 |
| `.lyrixi-hide-important`   | 强制隐藏       | `display: none !important`      |
| `.lyrixi-hidden`           | 隐藏但占位     | `visibility: hidden`            |
| `.lyrixi-hidden-important` | 强制隐藏但占位 | `visibility: hidden !important` |
| `.lyrixi-overflow-hidden`  | 隐藏溢出       | `overflow: hidden`              |
| `.lyrixi-overflow-auto`    | 自动滚动       | `overflow: auto`                |

## 定位

| 类名                                    | 说明         | 功能                 |
| --------------------------------------- | ------------ | -------------------- |
| `.lyrixi-position-absolute`             | 绝对定位     | `position: absolute` |
| `.lyrixi-position-absolute.lyrixi-full` | 全屏绝对定位 | 覆盖整个容器         |
| `.lyrixi-position-relative`             | 相对定位     | `position: relative` |

## 边框

### 基础边框

| 类名               | 说明     | 功能                                           |
| ------------------ | -------- | ---------------------------------------------- |
| `.lyrixi-border-0` | 无边框   | 移除所有边框                                   |
| `.lyrixi-bordered` | 四边边框 | `border: 1px solid var(--lyrixi-border-color)` |
| `.lyrixi-border`   | 四边边框 | `border: 1px solid var(--lyrixi-border-color)` |

### 单边边框

| 类名                | 说明     | 功能                                                  |
| ------------------- | -------- | ----------------------------------------------------- |
| `.lyrixi-border-t`  | 上边框   | `border-top: 1px solid var(--lyrixi-border-color)`    |
| `.lyrixi-border-b`  | 下边框   | `border-bottom: 1px solid var(--lyrixi-border-color)` |
| `.lyrixi-border-tb` | 上下边框 | 上下两条边框                                          |
| `.lyrixi-border-l`  | 左边框   | `border-left: 1px solid var(--lyrixi-border-color)`   |
| `.lyrixi-border-lt` | 左上边框 | 左上两条边框                                          |
| `.lyrixi-border-lb` | 左下边框 | 左下两条边框                                          |
| `.lyrixi-border-r`  | 右边框   | `border-right: 1px solid var(--lyrixi-border-color)`  |
| `.lyrixi-border-rt` | 右上边框 | 右上两条边框                                          |
| `.lyrixi-border-rb` | 右下边框 | 右下两条边框                                          |

### 边框样式

| 类名             | 说明     | 值                     |
| ---------------- | -------- | ---------------------- |
| `.lyrixi-dotted` | 点线边框 | `border-style: dotted` |
| `.lyrixi-dashed` | 虚线边框 | `border-style: dashed` |

### 特殊边框

| 类名                       | 说明       | 功能                 |
| -------------------------- | ---------- | -------------------- |
| `.lyrixi-basketline`       | 篮子线边框 | 带左右边线的底部边框 |
| `.lyrixi-border-separator` | 分割线     | 垂直分割线           |

## 交互控制

| 类名                            | 说明         | 功能                       |
| ------------------------------- | ------------ | -------------------------- |
| `.lyrixi-events-none`           | 禁用事件     | `pointer-events: none`     |
| `.lyrixi-noselect`              | 禁止选择     | 禁用文本选择和长按菜单     |
| `.lyrixi-transition-duration-0` | 禁用过渡动画 | `transition-duration: 0ms` |
| `.lyrixi-animation-duration-0`  | 禁用动画     | `animation-duration: 0ms`  |

## 显示控制

| 类名                   | 说明       | 值               |
| ---------------------- | ---------- | ---------------- |
| `.lyrixi-block`        | 块级显示   | `display: block` |
| `.lyrixi-inline-block` | 行内块显示 | `display: block` |
| `.lyrixi-width-full`   | 全宽       | `width: 100%`    |
| `.lyrixi-height-full`  | 全高       | `height: 100%`   |

## 清除浮动

| 类名               | 说明     | 功能               |
| ------------------ | -------- | ------------------ |
| `.lyrixi-clearfix` | 清除浮动 | 使用伪元素清除浮动 |
| `.lyrixi-clear`    | 清除浮动 | `clear: both`      |

## 背景图片

| 类名                        | 说明         | 图片地址     |
| --------------------------- | ------------ | ------------ |
| `.lyrixi-bg-avatar-default` | 默认头像背景 | 默认头像图片 |
| `.lyrixi-bg-image-default`  | 默认图片背景 | 默认图片     |

## 遮罩和动画

### 遮罩

| 类名           | 说明   | 功能               |
| -------------- | ------ | ------------------ |
| `.lyrixi-mask` | 遮罩层 | 全屏遮罩，支持动画 |

### 弹框动画

| 类名                      | 说明         | 功能             |
| ------------------------- | ------------ | ---------------- |
| `.lyrixi-modal-animation` | 弹框动画容器 | 支持多种动画效果 |

### 动画类型

| 动画值       | 说明         | 效果       |
| ------------ | ------------ | ---------- |
| `slideLeft`  | 从右往左滑动 | 从右侧滑入 |
| `slideRight` | 从左往右滑动 | 从左侧滑入 |
| `slideUp`    | 从下向上滑动 | 从底部滑入 |
| `slideDown`  | 从上向下滑动 | 从顶部滑入 |
| `zoom`       | 放大缩小     | 缩放动画   |
| `fade`       | 淡入淡出     | 透明度动画 |
| `none`       | 无动画       | 直接显示   |

### 位置类

| 类名                    | 说明         | 位置     |
| ----------------------- | ------------ | -------- |
| `.lyrixi-middle`        | 正中间弹出   | 屏幕中央 |
| `.lyrixi-top-left`      | 左上角弹出   | 左上角   |
| `.lyrixi-top-center`    | 顶部中央弹出 | 顶部中央 |
| `.lyrixi-top-right`     | 右上角弹出   | 右上角   |
| `.lyrixi-bottom-left`   | 左下角弹出   | 左下角   |
| `.lyrixi-bottom-center` | 底部中央弹出 | 底部中央 |
| `.lyrixi-bottom-right`  | 右下角弹出   | 右下角   |
| `.lyrixi-left-top`      | 左侧顶部弹出 | 左侧顶部 |
| `.lyrixi-left-middle`   | 左侧中央弹出 | 左侧中央 |
| `.lyrixi-left-bottom`   | 左侧底部弹出 | 左侧底部 |
| `.lyrixi-right-top`     | 右侧顶部弹出 | 右侧顶部 |
| `.lyrixi-right-middle`  | 右侧中央弹出 | 右侧中央 |
| `.lyrixi-right-bottom`  | 右侧底部弹出 | 右侧底部 |

## 变量

所有样式类都基于以下 CSS 变量：

### 间距变量

- `--lyrixi-space-xxl`: 16px
- `--lyrixi-space-xl`: 14px
- `--lyrixi-space-l`: 12px
- `--lyrixi-space-m`: 10px
- `--lyrixi-space-s`: 8px
- `--lyrixi-space-xs`: 6px
- `--lyrixi-space-xss`: 4px
- `--lyrixi-space-xxxs`: 2px

### 字体变量

- `--lyrixi-font-size-xxl`: 20px
- `--lyrixi-font-size-xl`: 18px
- `--lyrixi-font-size-l`: 16px
- `--lyrixi-font-size-m`: 14px
- `--lyrixi-font-size-s`: 12px
- `--lyrixi-font-size-xs`: 11px

### 圆角变量

- `--lyrixi-radius-xl`: 12px
- `--lyrixi-radius-l`: 10px
- `--lyrixi-radius-m`: 8px
- `--lyrixi-radius-s`: 6px
- `--lyrixi-radius-xs`: 4px
- `--lyrixi-radius-xxs`: 3px

### 颜色变量

- `--lyrixi-primary`: 主题色
- `--lyrixi-link`: 链接色
- `--lyrixi-warning`: 警告色
- `--lyrixi-danger`: 危险色
- `--lyrixi-success`: 成功色
- `--lyrixi-font-color-default`: 默认文字色
- `--lyrixi-font-color-secondary`: 次要文字色
- `--lyrixi-font-color-tertiary`: 辅助文字色
- `--lyrixi-font-color-quaternary`: 占位符文字色
- `--lyrixi-font-color-disabled`: 禁用文字色
- `--lyrixi-border-color`: 边框色
- `--lyrixi-bg-default`: 默认背景色

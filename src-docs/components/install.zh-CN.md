---
group:
  title: 通用
  order: 1
order: 1
title: 安装
toc: content
---

# 安装

<div align="center"><a name="readme-top"></a>

<img height="180" src="https://lyrixi.github.io/lyrixi/assets/images/logo.png">

<div style="font-size:24px;text-align:center;">lyrixi-mobile</div>

<div style="text-align:center;margin-top: 10px;">React 19 UI library for mobile.
Minimalist Token, Unified API, Simple and easy to use</div>

<img height="8" width="100%" src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png"/>

</div>

## 📦 Install

### NPM

```bash
npm install lyrixi-mobile
```

## 🤖 AI CLI

安装完成后，在项目根目录执行：

```bash
npx lyrixi-ai
```

该命令会：

1. 将包内 `.ai` 同步到工程根目录的 `.ai/`
2. **skills/**：同名 skill 覆盖，你独有的 skill 保留
3. **rules/**：同名 rule 覆盖，你独有的 rule 保留
4. **docs、commands、memory 等**：每次全量覆盖（随库版本更新）
5. 自动创建/更新 `.cursor/`、`.claude/` 软链接指向 `.ai`

升级 `lyrixi-mobile` 后重新执行即可更新文档与库侧配置。可选参数：`--dry-run`（预览变更）、`--force-link`（强制替换非软链的 `.cursor/*`、`.claude/*`）。

## 📦 CSS

### Less

```bash
@import 'lyrixi-mobile/assets/index.less';
```

### CSS import

```bash
@import 'lyrixi-mobile/assets/index.css';
```

## 🔨 Usage

```tsx
import { Button } from 'lyrixi-mobile'

export default () => (
  <>
    <Button className="primary">PRESS ME</Button>
  </>
)
```

[Visit lyrixi-mobile docs](https://lyrixi.github.io/lyrixi)

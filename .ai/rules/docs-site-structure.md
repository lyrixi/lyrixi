---
description: Lyrixi 文档站目录规范与分层职责
alwaysApply: true
---

# 目录规范

## 仓库顶层

```text
lyrixi/
├── assets/                 # 外网静态资源（构建时原样 → docs/assets/）
├── docs/                   # GitHub Pages 产物（生成物，勿手写业务代码）
│   ├── static/             # Vite chunk（JS/CSS）
│   ├── assets/             # 来自根目录 assets/ 的拷贝
│   ├── brand/              # 来自 site/public/brand
│   ├── index.html
│   └── preview.html
├── site/                   # 站点唯一源码根
├── package.json
└── .ai/                    # AI 规则与说明（本目录）
```

## `site/` 内部分层（职责单一）

```text
site/
├── index.html / preview.html
├── vite.config.ts          # base、outDir=../docs、assetsDir=static、alias
├── public/brand/           # Logo / Loading 等品牌图
├── scripts/
│   ├── generate-catalog.mjs
│   └── copy-assets.mjs     # 根 assets/ → docs/assets/
└── src/
    ├── main.tsx / App.tsx
    ├── config/             # products、nav、versions、catalog（含 generated）
    ├── context/            # ProductContext 等
    ├── content/            # MD 加载与 DocMarkdown
    ├── layouts/            # DocLayout、GuideLayout
    ├── components/         # LogoSwitcher、SiteHeader、Sidebar、PhoneFrame…
    ├── pages/              # 路由页面
    ├── preview/            # iframe DemoHost、demoRegistry（H5 demos）
    ├── stubs/              # （预留）RN-web stub；RN 未启用时勿强依赖
    └── styles/             # tokens.css、global.css
```

## 命名与放置约定

| 类别 | 约定 |
|------|------|
| 配置常量 | 只放 `site/src/config/`，禁止在组件里散落产品名/版本字符串 |
| 布局 | `layouts/`；可复用 UI 块放 `components/` |
| 路由页 | `pages/`，一页一文件，文件名与路由语义一致 |
| 样式 | 组件旁 CSS Modules；全局变量在 `styles/tokens.css` |
| 生成文件 | `catalog.generated.ts` 仅由脚本生成，禁止手改 |
| Sibling 内容 | 通过 alias / glob 读取，不复制整树进 `site/content/` |

## 开启 RN 时（待发布后）

1. `config/products.ts` → `mobile-rn.enabled: true`
2. `generate-catalog.mjs` → 对该产品 `scan: true`
3. 恢复 RN 预览入口与必要 stub/alias（见历史实现与计划）
4. 仍遵守：Vite → `static/`，根 `assets/` → `docs/assets/`

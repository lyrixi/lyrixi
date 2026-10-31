# Lyrixi Docs

统一文档站：当前以 **lyrixi-mobile** 为主；**lyrixi-mobile-rn** 在 Logo 下拉中保留「即将发布」口子。

## 开发

要求与 **lyrixi-mobile** 源码同级（例如 `development/lyrixi/lyrixi` 与 `development/lyrixi/lyrixi-mobile`）。文档正文与 demo 直接读取 sibling 里的 `lyrixi-mobile/src/**/index.zh-CN.md`，侧边栏与预览 id 由 catalog 脚本生成：

```bash
npm install
npm run catalog   # 可选：仅刷新 site/src/config/catalog.generated.ts
npm run dev
```

`dev` / `build` 会自动先跑 `catalog`。

### 依赖说明

- **Markdown 与 Demo 源码**：仍从同级 `../lyrixi-mobile/src` 读取（npm 包不含全部文档与 demo 文件）。
- **`lyrixi-mobile` npm 包**（`package.json` 中 `^0.1.3`）：供预览 iframe 内 `import 'lyrixi-mobile'` 与正式应用一致；若未安装或 `esm/` 不存在，Vite 会回退到 sibling `src/index.ts`。
- 安装：`npm install`（不要用 `file:../lyrixi-mobile`，会触发组件库 `prepare` 钩子）。

## 构建（GitHub Pages → `/docs`）

```bash
npm run build
```

产物约定：

| 路径 | 内容 |
|------|------|
| `docs/static/` | Vite 打包的 JS/CSS chunk |
| `docs/assets/` | 根目录 `assets/` **原封不动拷贝**（外网资源） |
| `docs/brand/` | 站点品牌图（`site/public/brand`） |

开启 RN：把 [`site/src/config/products.ts`](site/src/config/products.ts) 里 `mobile-rn.enabled` 改为 `true`，并把 catalog 的 `scan` 打开。

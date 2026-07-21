# Lyrixi Docs

统一文档站：当前以 **lyrixi-mobile** 为主；**lyrixi-mobile-rn** 在 Logo 下拉中保留「即将发布」口子。

## 开发

要求本机同级存在 `../lyrixi-mobile`：

```bash
npm install
npm run dev
```

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

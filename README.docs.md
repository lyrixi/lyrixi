# Lyrixi Docs

## 架构

- **底座**：dumi 2.4 + `dumi-theme-mobile`
- **指南**：本仓库 `src-docs/`
- **组件 / 工具文档**：本仓库 `mobile-src/`（MD + demo；dumi 只能扫描项目根内路径）
- **模板**：`node_modules/lyrixi-mobile/src/examples`
- **运行时**：webpack alias `lyrixi-mobile` → 已安装包的 `esm/`；`src` → 本仓库 `mobile-src/`（demo 内相对路径、样式）
- **首页**：`.dumi/pages/index` 品牌 hero 与主题色 token

## 与 lyrixi-mobile 同步

```bash
npm run sync:mobile-docs   # 从 ../lyrixi-mobile 更新 src-docs/ 与 mobile-src/
```

发布前请保证 `package.json` 中 `lyrixi-mobile` 版本与文档一致。

## 脱敏

`npm run build` 会先执行 `scripts/sanitize-docs.mjs`，扫描 `mobile-src/`、`src-docs/` 与 `.dumi/pages/`，替换或清空：

- 内部品牌/域名（如 qince、waiqin 等，不区分大小写）
- 地图 demo 中的 `bmap` / `google` / `amap` web key
- 内部 OSS 等不应公开的 URL

从 `lyrixi-mobile` 同步文档后，发布前请再跑一遍 `npm run build`，勿在 demo 中写真实 Key。

## 构建产物

| 路径 | 内容 |
|------|------|
| `docs/` | dumi 静态站点 |
| `docs/assets/` | 构建后由 `scripts/copy-assets.mjs` 从仓库根 `assets/` 拷贝 |

## 扩展 lyrixi-mobile-rn

在 `config/mobile-root.ts` 的 `atomDirs` / `docDirs` 中追加 RN 包路径，并单独验证 nav 与路由。

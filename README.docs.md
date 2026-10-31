# Lyrixi Docs

## 架构

- **底座**：dumi 2.4 + `dumi-theme-mobile`
- **内容**：扫描同级 `../lyrixi-mobile` 的 `src-docs`、`src/components`、`src/utils`、`src/examples`
- **样式 / 构建**：demo 与组件库一致，通过 webpack alias `src` → `lyrixi-mobile/src`，并优先解析 `lyrixi-mobile/node_modules`
- **首页**：`.dumi/pages/index` 保留品牌 hero（`public/brand/loading-hero.png`）与主题色 token

## 构建产物

| 路径 | 内容 |
|------|------|
| `docs/` | dumi 静态站点 |
| `docs/assets/` | 构建后由 `scripts/copy-assets.mjs` 从仓库根 `assets/` 拷贝（demo 外网资源） |

## 扩展 lyrixi-mobile-rn

推荐保持「一个文档站、多个 sibling 包」：

1. 克隆 `lyrixi-mobile-rn` 到与 `lyrixi-mobile` 同级
2. 在 `config/mobile-root.ts` 的 `atomDirs` / `docDirs` 中追加 RN 包路径
3. 若两套路由前缀冲突，再考虑为 RN 增加独立 nav 分组或第二 locale

当前仓库仅启用 **lyrixi-mobile**，无 RN 占位代码。

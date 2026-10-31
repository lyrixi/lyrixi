# Lyrixi

基于 [dumi](https://d.umijs.org/) 的 **lyrixi-mobile** 文档站，部署路径 `/lyrixi/`（GitHub Pages）。

## 目录结构

与组件库源码同级：

```text
development/lyrixi/
  lyrixi/           ← 本仓库（文档站）
  lyrixi-mobile/    ← 文档与 demo 来源（不拷贝进本仓库）
```

后期若要并入 **lyrixi-mobile-rn**：在 `config/mobile-root.ts` 里为 sibling 增加 `docDirs` / `atomDirs` 即可（需单独验证路由与 nav 是否冲突）。

## 本地开发

```bash
# 先确保 lyrixi-mobile 已 npm install
cd ../lyrixi-mobile && npm install && cd ../lyrixi

npm install
npm run dev      # http://localhost:8000/lyrixi/
npm run build    # 输出 docs/，并拷贝根目录 assets/ → docs/assets/
```

GitHub Pages：Settings → Pages → Deploy from branch → `/docs`。

更细说明见 [README.docs.md](./README.docs.md)。

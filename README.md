# Lyrixi

基于 [dumi](https://d.umijs.org/) 的 **lyrixi-mobile** 文档站，部署路径 `/lyrixi/`（GitHub Pages）。

## 目录结构

```text
lyrixi/
  src-docs/       ← 指南页（安装、全局样式等）
  mobile-src/     ← 组件 / 工具 MD 与 demo（与 lyrixi-mobile 同步）
  node_modules/lyrixi-mobile/  ← 运行时组件实现（npm，alias 到 esm）
```

模板示例扫描 `node_modules/lyrixi-mobile/src/examples`。

## 本地开发

```bash
npm install
npm run dev      # http://localhost:8000/lyrixi/
npm run build    # 输出 docs/，并拷贝根目录 assets/ → docs/assets/
```

若与 **lyrixi-mobile** 源码同级开发，文档有更新时可执行：

```bash
npm run sync:mobile-docs
```

GitHub Pages：Settings → Pages → Deploy from branch → `/docs`。

更细说明见 [README.docs.md](./README.docs.md).

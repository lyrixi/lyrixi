# Lyrixi

双库文档站（当前以 `lyrixi-mobile` 为主；`lyrixi-mobile-rn` 入口已预留，待 npm 发布后开启）。

## 本地开发

需与 sibling 源码同级：

```text
Documents/front/
  lyrixi/           ← 本仓库
  lyrixi-mobile/
  lyrixi-mobile-rn/ ← 可选（未发布前可不依赖）
```

```bash
npm install
npm run dev      # http://localhost:5173/lyrixi/
npm run build    # 输出到 docs/：static/（站点打包）+ assets/（根目录外网资源原样拷贝）
```

GitHub Pages：Settings → Pages → Deploy from branch → `/docs`。

更细说明见 [README.docs.md](./README.docs.md)。

---
description: Lyrixi 文档站强制性约束（构建、产物、RN、资源路径）— 始终生效
alwaysApply: true
---

# 强制性约束

违反任一条即视为错误实现，须在合并前修正。

## 构建与 GitHub Pages

1. **最终可访问资源必须落在 `docs/`**（Pages 选 branch 的 `/docs`）。
2. 每次 `npm run build` 必须：
   - Vite 打包站点到 `docs/`
   - **把仓库根目录 `assets/` 原封不动拷贝到 `docs/assets/`**（外网资源，组件库会引用；禁止改名、禁止打散、禁止只拷部分）
3. Vite 打包出的 JS/CSS/chunk **必须**放在 `docs/static/`（`build.assetsDir: 'static'`），**禁止**占用 `docs/assets/`，以免与外网 `assets` 冲突。
4. `docs/` 视为生成物：源码只写在 `site/`（及根 `assets/` 资源）；不要把手写业务源码塞进 `docs/`。

## 框架与依赖

1. **禁止**使用 Dumi（及同类强绑定主题的文档框架）作为站点壳。
2. 当前阶段以 **lyrixi-mobile** 为主；**不要**把未发布的 `lyrixi-mobile-rn` 正式接进预览/catalog 扫描。
3. RN 仅保留产品配置与路由口子：`products.ts` 中 `mobile-rn.enabled: false`；发布 npm 后由维护者改为 `true` 并恢复 scan/预览，**等用户明确通知后再做**。

## 内容与源码边界

1. 组件 API/演示优先 **复用** sibling 的 `index.zh-CN.md` 与 `demos/`，不要整份抄写进本仓。
2. Dumi 语法 `<code src="./demos/xxx.tsx">` 须转成站点 preview（右侧手机框），不要原样丢给浏览器。
3. 本仓不提交组件库私有源码；发布物只依赖 npm / 本地 alias 构建。

## 品牌与体验

1. 配色以用户提供的品牌为准：主色 `#35e6b6`、壳层炭灰、组件正文浅底。
2. 不以泛化 AI 紫白模板风覆盖品牌。
3. Logo 切换须尽量保留同 slug；无对应页则回该产品指南（RN 未启用时不可切换过去）。

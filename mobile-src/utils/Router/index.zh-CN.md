---
category: Utils
group: 基本工具
title: Router
---

# Router

路由导航适配器：通过 `config` 注入底层实现（如 react-router），业务侧统一调用 `push` / `replace` / `back`，并用 `getAction` 读取最近一次路由动作。

## 何时使用

- 业务页面需要与具体路由库解耦的统一导航 API
- 需要根据前进 / 返回动作决定是否清理页面缓存（如列表缓存）

## 示例

<code src="./demos/Router.tsx"></code>

## API

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| `Router.config(params)` | 注入 `push` / `replace` / `back` / `getAction` | `(params?: RouterConfigParams) => void` |
| `Router.push(name, params?)` | 前进到指定路由 | `(name: string, params?: RouterParams) => unknown` |
| `Router.replace(name, params?)` | 替换当前路由 | `(name: string, params?: RouterParams) => unknown` |
| `Router.back()` | 返回上一页 | `() => unknown` |
| `Router.getAction()` | 返回最近一次动作 | `() => 'push' \| 'replace' \| 'back' \| undefined` |

### RouterConfigParams

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `push` | 前进实现 | `(name: string, params?: RouterParams) => unknown` |
| `replace` | 替换实现 | `(name: string, params?: RouterParams) => unknown` |
| `back` | 返回实现 | `() => unknown` |
| `getAction` | 自定义读取动作（可感知浏览器返回）；未注入时使用 Router 自身记录 | `() => RouterAction \| null \| undefined` |

### 接入示例（react-router）

```tsx
import { useNavigate, useNavigationType } from 'react-router-dom'
import { Router } from 'lyrixi-mobile'

function setupRouter() {
  const navigate = useNavigate()
  // 注意：getAction 若需感知浏览器返回，建议在路由变化处同步 history / NavigationType
  Router.config({
    push: (name, params) => navigate(name, { state: params }),
    replace: (name, params) => navigate(name, { replace: true, state: params }),
    back: () => navigate(-1),
    getAction: () => {
      // NavigationType: 'PUSH' | 'REPLACE' | 'POP'
      // 映射为 'push' | 'replace' | 'back'
    }
  })
}
```

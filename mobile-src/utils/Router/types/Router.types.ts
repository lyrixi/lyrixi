// 路由动作：前进 / 替换 / 返回 / 刷新
export type RouterAction = 'push' | 'replace' | 'back' | 'refresh'

// 路由参数
export type RouterParams = Record<string, unknown>

export type RouterPushHandler = (name: string, params?: RouterParams) => unknown

export type RouterReplaceHandler = (name: string, params?: RouterParams) => unknown

export type RouterBackHandler = () => unknown

export type RouterGetActionHandler = () => RouterAction | null | undefined

// Router.config 注入的导航实现
export interface RouterConfigParams {
  push?: RouterPushHandler
  replace?: RouterReplaceHandler
  back?: RouterBackHandler
  getAction?: RouterGetActionHandler
}

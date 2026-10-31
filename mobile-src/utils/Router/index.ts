import type { RouterAction, RouterConfigParams, RouterParams } from './types'

let handlers: RouterConfigParams = {}
let lastAction: RouterAction | undefined

/**
 * 注入底层导航实现（如 react-router / 业务路由）
 * @example
 * Router.config({
 *   push: (name, params) => navigate(name, { state: params }),
 *   replace: (name, params) => navigate(name, { replace: true, state: params }),
 *   back: () => navigate(-1),
 *   getAction: () => mapHistoryAction(history.action)
 * })
 */
function config(params: RouterConfigParams = {}) {
  handlers = { ...handlers, ...params }
}

/**
 * 前进到指定路由
 * @example Router.push('user', { id: 1 })
 */
function push(name: string, params?: RouterParams) {
  lastAction = 'push'
  return handlers.push?.(name, params)
}

/**
 * 替换当前路由
 * @example Router.replace('login')
 */
function replace(name: string, params?: RouterParams) {
  lastAction = 'replace'
  return handlers.replace?.(name, params)
}

/**
 * 返回上一页
 * @example Router.back()
 */
function back() {
  lastAction = 'back'
  return handlers.back?.()
}

/**
 * 获取最近一次路由动作
 * 优先使用 config 注入的 getAction（可感知浏览器返回等）；否则返回 Router 自身记录的动作
 * @returns 'push' | 'replace' | 'back'
 */
function getAction() {
  if (typeof handlers.getAction === 'function') {
    return handlers.getAction() ?? undefined
  }
  return lastAction
}

const Router = {
  config,
  push,
  replace,
  back,
  getAction
}

export default Router

import type { ExitFullscreenTarget, FullscreenDocument, RequestFullscreenElement } from './types'

// FullScreen
const FullScreen = {
  // 是否支持全屏
  support: function () {
    const body = document.body as RequestFullscreenElement
    const doc = document as FullscreenDocument
    const canCall =
      typeof body.requestFullscreen === 'function' ||
      typeof body.webkitRequestFullscreen === 'function' ||
      typeof body.mozRequestFullScreen === 'function' ||
      typeof body.msRequestFullscreen === 'function'
    const enabled = !!(
      doc.fullscreenEnabled ||
      doc.mozFullScreenEnabled ||
      doc.webkitFullscreenEnabled ||
      doc.msFullscreenEnabled
    )
    return canCall && enabled
  },
  // 获取当前全屏的元素
  getFullscreenElement: function () {
    const doc = document as FullscreenDocument
    return (
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.msFullscreenElement ||
      doc.mozFullScreenElement ||
      null
    )
  },
  // 是否全屏
  isFull: function (el?: Element | Document | null) {
    if (this.getFullscreenElement()) return true
    const target = (el ?? document) as unknown as RequestFullscreenElement
    return !!target.webkitIsFullScreen
  },
  // 进入全屏
  enter: function (el?: Element | null) {
    const target = (el || document.body) as RequestFullscreenElement
    const requestMethod =
      target.requestFullscreen ||
      target.webkitRequestFullscreen ||
      target.mozRequestFullScreen ||
      target.msRequestFullscreen
    if (requestMethod) {
      requestMethod.call(target)
    } else if (
      typeof (
        window as unknown as {
          ActiveXObject?: new (id: string) => { SendKeys: (k: string) => void }
        }
      ).ActiveXObject !== 'undefined'
    ) {
      const AX = (
        window as unknown as {
          ActiveXObject: new (id: string) => { SendKeys: (k: string) => void }
        }
      ).ActiveXObject
      const wscript = new AX('WScript.Shell')
      if (wscript !== null) {
        wscript.SendKeys('{F11}')
      }
    }
  },
  // 退出全屏
  exit: function (el?: Element | Document | null) {
    const doc = document as FullscreenDocument
    const target = (el || document) as ExitFullscreenTarget
    if (typeof doc.exitFullscreen === 'function') {
      void target.exitFullscreen?.()
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen()
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen()
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen()
    }
    return this
  },
  // 切换
  toggle: function (el?: Element | null, handler?: (v: boolean) => void) {
    if (this.isFull(undefined)) {
      this.exit(undefined)
      if (handler) handler(false)
    } else {
      this.enter(el)
      if (handler) handler(true)
    }
  },
  // 监听
  on: function (element: HTMLElement | null | undefined, fn: EventListener): void {
    let target = element || document
    target.addEventListener('webkitfullscreenchange', fn, false)
    target.addEventListener('mozfullscreenchange', fn, false)
    target.addEventListener('fullscreenchange', fn, false)
    target.addEventListener('MSFullscreenChange', fn, false)
  }
}

export default FullScreen

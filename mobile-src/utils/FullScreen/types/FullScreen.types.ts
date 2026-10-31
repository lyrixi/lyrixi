// 旧版浏览器全屏 API，DOM lib 未完整收录
export type RequestFullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void
  mozRequestFullScreen?: () => Promise<void> | void
  msRequestFullscreen?: () => Promise<void> | void
  requestFullscreen?: () => Promise<void> | void
  webkitIsFullScreen?: boolean
}

export type FullscreenDocument = Document & {
  mozFullScreenEnabled?: boolean
  webkitFullscreenEnabled?: boolean
  msFullscreenEnabled?: boolean
  webkitFullscreenElement?: Element | null
  msFullscreenElement?: Element | null
  mozFullScreenElement?: Element | null
  mozCancelFullScreen?: () => void
  webkitExitFullscreen?: () => void
  msExitFullscreen?: () => void
}

export type ExitFullscreenTarget =
  | Document
  | (HTMLElement & {
      exitFullscreen?: () => Promise<void> | void
      mozCancelFullScreen?: () => void
      webkitExitFullscreen?: () => void
      msExitFullscreen?: () => void
    })

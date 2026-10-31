import type { CSSProperties } from 'react'

export interface WebViewRef {
  element: HTMLIFrameElement | null
}

// 加载开始 / 成功回调结果，形态对齐 Bridge onSuccess
export type WebViewLoadSuccessResult = {
  status: 'success'
  message?: string
}

// 加载失败回调结果，形态对齐 Bridge onError
export type WebViewLoadErrorResult = {
  status: 'error'
  message?: string
}

export type WebViewLoadStartCallback = (result: WebViewLoadSuccessResult) => void
export type WebViewLoadSuccessCallback = (result: WebViewLoadSuccessResult) => void
export type WebViewLoadErrorCallback = (result: WebViewLoadErrorResult) => void

export interface WebViewProps {
  // Value & Display Value
  src?: string
  data?: unknown
  // Events
  onLoadStart?: WebViewLoadStartCallback
  onLoadSuccess?: WebViewLoadSuccessCallback
  onLoadError?: WebViewLoadErrorCallback
  // Style
  style?: CSSProperties
  className?: string
}

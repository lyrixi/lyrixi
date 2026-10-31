import React, { useImperativeHandle, forwardRef, useEffect, useRef } from 'react'
import type { WebViewProps, WebViewRef } from './types'

// 全屏 iframe
const WebView = forwardRef<WebViewRef, WebViewProps>(
  (
    {
      // Value & Display Value
      src,
      data,

      // Style
      style,
      className,

      // Events
      onLoadStart,
      onLoadSuccess,
      onLoadError
    },
    ref
  ) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const loadingRef = useRef(false)
    const callbacksRef = useRef({ onLoadStart, onLoadSuccess, onLoadError })
    callbacksRef.current = { onLoadStart, onLoadSuccess, onLoadError }

    // 修改src，用替换的方法不会产生历史记录长度
    useEffect(() => {
      const iframe = iframeRef.current
      if (!iframe) return

      // 使用 replace 方法修改 src 属性值
      if (src) {
        loadingRef.current = true
        callbacksRef.current.onLoadStart?.({
          status: 'success',
          message: ''
        })
        iframe.contentWindow?.location.replace(src)
      }

      if (data !== undefined) {
        ;(iframe as HTMLIFrameElement & { data?: unknown }).data = data
      }
      // eslint-disable-next-line
    }, [src])

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return iframeRef.current
        }
      }
    })

    function handleLoad() {
      if (!loadingRef.current) return
      loadingRef.current = false
      callbacksRef.current.onLoadSuccess?.({
        status: 'success',
        message: ''
      })
    }

    function handleError() {
      if (!loadingRef.current) return
      loadingRef.current = false
      callbacksRef.current.onLoadError?.({
        status: 'error',
        message: 'load error'
      })
    }

    return (
      <iframe
        ref={iframeRef}
        title="webview"
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          bottom: '0',
          right: '0',
          border: 'none',
          ...style
        }}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
      />
    )
  }
)

export default WebView

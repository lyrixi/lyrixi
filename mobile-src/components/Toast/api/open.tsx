import React from 'react'
import type { ToastProps } from '../types'

import close from './close'
import { DEFAULT_TOAST_DURATION, TOAST_ID } from './constants'
import toastInstance from './ToastInstance'
import Toast from '../Toast'

// 内库使用-start
import { createRoot } from '../../../utils/ReactDOMClientCompat'
// 内库使用-end

// 显示 Toast（全局同时仅存在一个，再次 open 会先关闭上一个）
function open(props?: ToastProps): HTMLDivElement {
  void close()

  const { portal: externalPortal, duration: externalDuration, onClose, ...toastProps } = props || {}
  const duration = typeof externalDuration === 'number' ? externalDuration : DEFAULT_TOAST_DURATION
  const portal = externalPortal || document.getElementById('root') || document.body
  const rootElement = document.createElement('div')
  rootElement.id = TOAST_ID
  portal.appendChild(rootElement)

  const root = createRoot(rootElement)
  toastInstance.root = root
  toastInstance.rootElement = rootElement

  root.render(<Toast {...toastProps} />)

  if (duration > 0) {
    toastInstance.closeTimer = window.setTimeout(() => {
      toastInstance.closeTimer = null
      close({ onClose })
    }, duration)
  }

  return rootElement
}

export default open

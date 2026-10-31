import toastInstance from './ToastInstance'

import type { ToastCloseParams } from '../types'

function clearCloseTimer() {
  if (toastInstance.closeTimer !== null) {
    window.clearTimeout(toastInstance.closeTimer)
    toastInstance.closeTimer = null
  }
}

function destroy() {
  clearCloseTimer()
  toastInstance.root?.unmount()
  toastInstance.root = null
  toastInstance.rootElement?.remove()
  toastInstance.rootElement = null
}

// 关闭当前 Toast.open 实例（全局仅允许一个）
export default function close(params?: ToastCloseParams): void {
  const { onClose } = params ?? {}

  if (!toastInstance.root || !toastInstance.rootElement) {
    return
  }

  destroy()
  onClose?.()
}

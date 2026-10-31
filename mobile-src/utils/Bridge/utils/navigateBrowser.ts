import type { BridgeNavigateParams } from './../types'

// 内库使用-start
import Device from './../../Device'
// 内库使用-end

/* 测试使用-start
import { Device } from 'lyrixi-mobile'
测试使用-end */

export type NavigateBrowserMode = 'push' | 'replace' | 'launch'

function navigateBrowser(params: BridgeNavigateParams | undefined, mode: NavigateBrowserMode) {
  const { url, onSuccess, onError } = params || {}
  if (!url) {
    onError?.({ status: 'error', message: 'url error' })
    return
  }
  if (mode === 'push' && Device.device === 'pc') {
    window.open(url)
  } else if (mode === 'push') {
    window.location.href = url
  } else {
    window.location.replace(url)
  }
  onSuccess?.({ status: 'success', data: undefined })
}

export default navigateBrowser

import type { LoadLeafletParams } from './loadSource.types'

// 内库使用-start
import AssetUtil from '../../../../utils/AssetUtil'
// 内库使用-end

/* 测试使用-start
import { AssetUtil } from 'lyrixi-mobile'
测试使用-end */

function pickResult(r: unknown): Record<string, unknown> {
  return typeof r === 'object' && r !== null ? { ...(r as Record<string, unknown>) } : {}
}

// 加载地图资源
function loadLeaflet(params: LoadLeafletParams = {}): Promise<unknown> {
  const { css, js } = params
  return new Promise((resolve) => {
    if (window.L) {
      resolve({
        status: 'success',
        data: window.L
      })
      return
    }

    const cssTag = document.getElementById('leaflet-css')
    if (cssTag?.parentNode) {
      cssTag.parentNode.removeChild(cssTag)
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = css || 'https://lyrixi.github.io/lyrixi/assets/plugin/leaflet/css/leaflet.css'
    link.id = 'leaflet-css'
    document.head.appendChild(link)

    const scriptTag = document.getElementById('leaflet-js')
    if (scriptTag?.parentNode) {
      scriptTag.parentNode.removeChild(scriptTag)
    }

    AssetUtil.loadRemoteJs(
      js || 'https://lyrixi.github.io/lyrixi/assets/plugin/leaflet/js/leaflet.js',
      {
        id: 'leaflet-js',
        onSuccess: (result: unknown) => {
          resolve({
            ...pickResult(result),
            data: window.L
          })
        },
        onError: (result: unknown) => {
          resolve(result)
        }
      }
    )
  })
}

export default loadLeaflet

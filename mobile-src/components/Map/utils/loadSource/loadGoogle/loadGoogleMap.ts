// 内库使用-start
import AssetUtil from '../../../../../utils/AssetUtil'
// 内库使用-end

/* 测试使用-start
import { AssetUtil } from 'lyrixi-mobile'
测试使用-end */

function pickResult(r: unknown): Record<string, unknown> {
  return typeof r === 'object' && r !== null ? { ...(r as Record<string, unknown>) } : {}
}

// 加载google地图资源
function loadGoogleMap(key: string | undefined): Promise<unknown> {
  return new Promise((resolve) => {
    if (window.google) {
      resolve(window.google)
      return
    }

    const scriptTag = document.getElementById('lyrixi-google-map-js')
    if (scriptTag?.parentNode) {
      scriptTag.parentNode.removeChild(scriptTag)
    }

    AssetUtil.loadRemoteJs(`https://maps.googleapis.com/maps/api/js?key=${key}`, {
      id: 'lyrixi-google-map-js',
      onSuccess: (result: unknown) => {
        resolve({
          ...pickResult(result),
          data: window.google
        })
      },
      onError: (result: unknown) => {
        resolve({
          ...pickResult(result),
          code: 'GOOGLE_MAP_LOAD_ERROR',
          message: 'google地图加载失败'
        })
      }
    })
  })
}

export default loadGoogleMap

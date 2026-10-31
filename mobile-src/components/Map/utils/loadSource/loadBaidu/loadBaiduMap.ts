// 内库使用-start
import LocaleUtil from './../../../../../utils/LocaleUtil'
import AssetUtil from './../../../../../utils/AssetUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, AssetUtil } from 'lyrixi-mobile'
测试使用-end */

function pickResult(r: unknown): Record<string, unknown> {
  return typeof r === 'object' && r !== null ? { ...(r as Record<string, unknown>) } : {}
}

// 加载BMap地图资源
function loadBaiduMap(key: string | undefined): Promise<unknown> {
  return new Promise((resolve) => {
    if (window.BMap) {
      resolve({
        status: 'success',
        data: window.BMap
      })
      return
    }

    const scriptTag = document.getElementById('lyrixi-bmap-map-js')
    if (scriptTag?.parentNode) {
      scriptTag.parentNode.removeChild(scriptTag)
    }

    AssetUtil.loadRemoteJs(
      `https://api.map.baidu.com/api?v=3.0&ak=${key}&callback=&callback=onBMapLoad`,
      {
        id: 'lyrixi-bmap-map-js',
        onSuccess: (result: unknown) => {
          window.onBMapLoad = function () {
            if (window.BMap) {
              resolve({
                ...pickResult(result),
                data: window.BMap
              })
            } else {
              resolve({
                ...pickResult(result),
                code: 'BMAP_MAP_LOAD_ERROR',
                message: LocaleUtil.locale(
                  `地图库加载失败, 请稍后再试`,
                  'lyrixi_a4e7c736f59a78f9e58bfe8af5283e3e'
                )
              })
            }
          }
        },
        onError: (result: unknown) => {
          resolve({
            ...pickResult(result),
            code: 'BMAP_JS_LOAD_ERROR',
            message: LocaleUtil.locale(
              `地图库加载失败, 请稍后再试`,
              'lyrixi_a4e7c736f59a78f9e58bfe8af5283e3e'
            )
          })
        }
      }
    )
  })
}

export default loadBaiduMap

import loadLeaflet from './loadLeaflet'
import loadGoogle from './loadGoogle'
import loadBaidu from './loadBaidu'
import { resolveMapKey } from '../getMapKey'
import type { MapLoaderSourceConfig, LoadSourceResult } from './loadSource.types'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

// Load leaflet map source
async function loadSource(
  params: MapLoaderSourceConfig = {
    leaflet: {
      css: 'https://lyrixi.github.io/lyrixi/assets/plugin/leaflet/css/leaflet.css',
      js: 'https://lyrixi.github.io/lyrixi/assets/plugin/leaflet/js/leaflet.js'
    }
  }
): Promise<LoadSourceResult> {
  let result = (await loadLeaflet(params?.leaflet)) as LoadSourceResult
  if (result.status === 'error') {
    return result
  }

  const mapKey = resolveMapKey(params)

  if (params.type === 'google') {
    result = (await loadGoogle(mapKey || undefined)) as LoadSourceResult
    return result
  }

  if (params.type === 'bmap') {
    result = (await loadBaidu(mapKey || undefined)) as LoadSourceResult
    return result
  }

  if (params.type === 'amap') {
    return {
      status: 'error',
      message: LocaleUtil.locale(
        'amap 地图加载暂未实现',
        'lyrixi_41c565a512977e89258bf18668cac24c'
      ) as string
    }
  }

  return {
    status: 'error',
    message: LocaleUtil.locale(
      '不支持的地图类型，仅支持 google 和 bmap',
      'lyrixi_100982304996ae84d314388fe357a218'
    ) as string
  }
}

export default loadSource

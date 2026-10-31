import loadBaiduMap from './loadBaiduMap'
import loadBaiduTileLayer from './loadBaiduTileLayer'
import type { LoadStatus } from '../loadSource.types'

// 加载BMap地图资源
async function loadBaidu(key: string | undefined): Promise<unknown> {
  const result: unknown = await loadBaiduMap(key)
  const r = result as LoadStatus
  if (r?.status === 'error') {
    return result
  }
  await loadBaiduTileLayer()
  return result
}

export default loadBaidu

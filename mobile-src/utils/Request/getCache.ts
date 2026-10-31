// 内库使用-start
import Storage from './../Storage'
// 内库使用-end

/* 测试使用-start
import { Storage } from 'lyrixi-mobile'
测试使用-end */

async function getCache(url: string, cacheKey: string | number): Promise<unknown> {
  if (!cacheKey || !['string', 'number'].includes(typeof cacheKey)) {
    return undefined
  }
  const cache = (await Storage.getItem(url)) as {
    cacheKey?: string | number
    data?: unknown
  } | null
  if (!cache || cache.cacheKey !== cacheKey) {
    return undefined
  }
  return cache.data
}

export default getCache

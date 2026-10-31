import CacheKey from './CacheKey'

// 内库使用-start
import Storage from '../../../../../utils/Storage'
// 内库使用-end

/* 测试使用-start
import {Storage } from 'lyrixi-mobile'
测试使用-end */

// 删除地址缓存
async function clearAddressCache() {
  try {
    await Storage.removeItem(CacheKey)
  } catch (error) {
    console.warn('删除地址缓存失败:', error)
  }
}

export default clearAddressCache

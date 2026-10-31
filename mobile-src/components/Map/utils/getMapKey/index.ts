import type { MapKey, MapProviderConfig } from '../../types/Map.Provider.types'

// 内库使用-start
import Device from './../../../../utils/Device'
// 内库使用-end

/* 测试使用-start
import { Device } from 'lyrixi-mobile'
测试使用-end */

function getMapKey(mapKey?: MapKey): string {
  if (!mapKey) {
    return ''
  }

  const os = Device.os
  if (os === 'android') {
    return mapKey.android || mapKey.web || ''
  }
  if (os === 'ios') {
    return mapKey.ios || mapKey.web || ''
  }
  return mapKey.web || ''
}

function getMapKeysByType(config?: MapProviderConfig): MapKey | undefined {
  if (config?.type === 'bmap') {
    return config.bmapKeys
  }
  if (config?.type === 'google') {
    return config.googleKeys
  }
  if (config?.type === 'amap') {
    return config.amapKeys
  }
  return undefined
}

function resolveMapKey(config?: MapProviderConfig): string {
  return getMapKey(getMapKeysByType(config))
}

function hasMapKey(mapKey?: MapKey): boolean {
  return !!getMapKey(mapKey)
}

function hasMapConfigKey(config?: MapProviderConfig): boolean {
  return !!resolveMapKey(config)
}

export default getMapKey
export { getMapKeysByType, hasMapKey, hasMapConfigKey, resolveMapKey }

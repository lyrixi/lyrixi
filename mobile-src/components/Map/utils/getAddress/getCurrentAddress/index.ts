import bmapGetAddress from './bmapGetAddress'
import googleGetAddress from './googleGetAddress'

import type { GetAddressParams, GetAddressResult } from '../../../types'

// 内库使用-start
import Toast from '../../../../Toast'
// 内库使用-end

/* 测试使用-start
import { Toast } from 'lyrixi-mobile'
测试使用-end */

// 地址逆解析
async function getCurrentAddress(params: GetAddressParams): Promise<GetAddressResult> {
  if (params?.address) {
    return {
      status: 'success',
      data: params
    }
  }

  if (
    typeof params?.longitude !== 'number' ||
    typeof params?.latitude !== 'number' ||
    !params?.type
  ) {
    return {
      status: 'error',
      message: 'getAddress must pass longitude, latitude and type'
    }
  }

  let result: GetAddressResult
  if (window.google) {
    result = (await googleGetAddress(params)) as GetAddressResult
  } else if (window.BMap) {
    result = (await bmapGetAddress(params)) as GetAddressResult
  } else {
    result = {
      status: 'error',
      message: 'getAddress requires google or bmap map SDK'
    }
  }

  if (result?.status === 'error') {
    if (result.message) {
      Toast.open({ content: result.message })
    }
    return result
  }

  return {
    status: 'success',
    code: result.code,
    message: result.message,
    data: {
      ...params,
      ...(result.data ?? {})
    }
  }
}

export default getCurrentAddress

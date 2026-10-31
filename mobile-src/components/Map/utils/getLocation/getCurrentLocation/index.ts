import type { GetLocationParams } from '../../../types'

// 内库使用-start
import Bridge from '../../../../../utils/Bridge'
// 内库使用-end

/* 测试使用-start
import { Bridge } from 'lyrixi-mobile'
测试使用-end */

// 定位
function getCurrentLocation(params: GetLocationParams = { type: 'wgs84' }): Promise<unknown> {
  const t = params?.type || 'wgs84'

  return new Promise((resolve) => {
    Bridge.getLocation({
      type: t,
      onSuccess: (result: unknown) => {
        console.log('lyrixi location success:', result)
        resolve(result)
      },
      onError: (error: unknown) => {
        console.error('lyrixi location fail:', error)
        resolve(error)
      },
      onCancel: (error: unknown) => {
        console.error('lyrixi location cancel:', error)
        resolve(error)
      }
    } as Record<string, unknown>)
  })
}

export default getCurrentLocation

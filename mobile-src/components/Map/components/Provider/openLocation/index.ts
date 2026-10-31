import Bridge from '../../../../../utils/Bridge'

import type { ErrorResult, SuccessResult } from '../../../../../types'
import type { BridgeOpenLocationParams } from '../../../../../utils/Bridge/types'

function openLocation(params?: BridgeOpenLocationParams): Promise<SuccessResult | ErrorResult> {
  return new Promise((resolve) => {
    Bridge.openLocation({
      ...params,
      onSuccess: (result: SuccessResult) => {
        resolve(result)
      },
      onError: (error: ErrorResult) => {
        resolve(error)
      }
    })
  })
}

export default openLocation

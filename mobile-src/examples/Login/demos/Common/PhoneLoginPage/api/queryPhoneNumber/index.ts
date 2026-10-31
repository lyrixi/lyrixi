import { Bridge, LocaleUtil } from 'lyrixi-mobile'

import type { QueryPhoneNumberResult } from '../../types'
import type { BridgeCallbackResult, BridgeWithPlatform, PhoneNumberBridgeData } from './types'

const locale = LocaleUtil.locale

function getLyrixiBridge() {
  const bridge = Bridge as BridgeWithPlatform
  return bridge._getCurrentBridge?.('lyrixi')
}

function createResult(
  status: QueryPhoneNumberResult['status'],
  message = '',
  data: QueryPhoneNumberResult['data'] = {
    phoneNumber: '',
    carrierCode: ''
  }
): QueryPhoneNumberResult {
  return {
    status,
    message,
    data
  }
}

async function queryPhoneNumber() {
  return new Promise<QueryPhoneNumberResult>((resolve) => {
    const lyrixiBridge = getLyrixiBridge()
    if (!lyrixiBridge?.getPhoneNumber) {
      resolve(createResult('error', String(locale('当前环境不支持一键登录'))))
      return
    }

    lyrixiBridge.getPhoneNumber({
      onSuccess: (result: BridgeCallbackResult<PhoneNumberBridgeData>) => {
        const data = result?.data
        if (data?.phoneNumber && data?.code) {
          resolve(
            createResult('success', '', {
              phoneNumber: data.phoneNumber,
              carrierCode: data.code
            })
          )
          return
        }
        resolve(createResult('error', result?.message || String(locale('获取本机号码失败'))))
      },
      onError: (error: BridgeCallbackResult) => {
        resolve(createResult('error', error?.message || String(locale('获取本机号码失败'))))
      }
    })
  })
}

export default queryPhoneNumber

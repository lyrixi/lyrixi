// 内库使用-start
import Device from './../../../../utils/Device'
import Storage from './../../../../utils/Storage'
// 内库使用-end

/* 测试使用-start
import { Device, Storage } from 'lyrixi-mobile'
测试使用-end */

async function getPayloadValue(payloadKey: string): Promise<string> {
  let urlPayloadValue = Device.getUrlParameter(payloadKey)
  let storedValue = await Storage.getItem(payloadKey)
  let payloadValue = urlPayloadValue || storedValue || ''
  if (payloadValue) {
    await Storage.setItem(payloadKey, payloadValue)
  }
  return String(payloadValue || '')
}

export default getPayloadValue

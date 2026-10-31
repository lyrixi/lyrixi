import getPayloadValue from './getPayloadValue'

async function getPayload() {
  let payload: {
    appId: string
    url: string
    lowerAppId?: string
    suiteType?: string
  } = {
    appId: (await getPayloadValue('appId')) || '',
    url: window.location.href.split('#')[0]
  }
  // 获取下游appId
  let lowerAppId = await getPayloadValue('lowerAppId')
  if (lowerAppId) {
    payload.lowerAppId = lowerAppId
  }
  // 获取suiteType
  let suiteType = await getPayloadValue('suiteType')
  if (suiteType) {
    payload.suiteType = suiteType
  }
  return payload
}

export default getPayload

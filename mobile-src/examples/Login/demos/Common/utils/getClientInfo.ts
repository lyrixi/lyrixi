import { Device } from 'lyrixi-mobile'

import type { LoginClientInfo } from './types'

export function getClientInfo(): LoginClientInfo {
  return {
    clientType: Device.platform === 'lyrixi' ? 'MOBILE_CLIENT' : 'WEB',
    clientVersion: Device.platformVersion || '1.0.0',
    os: (Device.os || '').toUpperCase(),
    osVersion: Device.osVersion || '',
    model: Device.model || ''
  }
}

export interface PhoneNumberBridgeData {
  code: string
  phoneNumber: string
}

export interface BridgeCallbackResult<T = unknown> {
  status?: string
  code?: string
  message?: string
  data?: T
}

export interface BridgeGetPhoneNumberParams {
  onSuccess?: (result: BridgeCallbackResult<PhoneNumberBridgeData>) => void
  onError?: (error: BridgeCallbackResult) => void
}

export interface LyrixiBridgeAdapter {
  getPhoneNumber?: (params?: BridgeGetPhoneNumberParams) => void
}

export interface BridgeWithPlatform {
  platform?: string
  _getCurrentBridge?: (platform?: string) => LyrixiBridgeAdapter
}

export type LoginType = 'phone' | 'code' | 'user'

export interface LoginClientInfo {
  clientType: string
  clientVersion: string
  os: string
  osVersion: string
  model: string
}

export interface LoginUserData {
  token?: string
  id?: number
  phone?: string
  loginType?: string
  nickname?: string
}

export interface LoginApiResult {
  code: string
  message?: string
  data?: LoginUserData
}

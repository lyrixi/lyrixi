import type { LoginType } from '../utils/types'

export type PhoneLoginPageProps = {
  onSwitchLoginType: (loginType: LoginType) => void
}

export interface QueryPhoneNumberResult {
  status: 'loading' | 'error' | 'success'
  message: string
  data: {
    phoneNumber: string
    carrierCode: string
  }
}

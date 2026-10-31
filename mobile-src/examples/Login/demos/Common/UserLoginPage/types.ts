import type { LoginType } from '../utils/types'

export type UserLoginPageProps = {
  onSwitchLoginType: (loginType: LoginType) => void
}

import type { LoginType } from '../utils/types'

export type CodeLoginPageProps = {
  onSwitchLoginType: (loginType: LoginType) => void
}

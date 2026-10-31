import type { LoginClientInfo } from '../../../utils/types'

function serverData(opts: { username: string; password: string; clientInfo: LoginClientInfo }) {
  const { username, password, clientInfo } = opts
  return {
    username,
    password,
    ...clientInfo
  }
}

export default serverData

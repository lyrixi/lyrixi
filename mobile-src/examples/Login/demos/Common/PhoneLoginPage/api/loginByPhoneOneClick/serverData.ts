import type { LoginClientInfo } from '../../../utils/types'

function serverData(opts: { phone: string; code: string; clientInfo: LoginClientInfo }) {
  const { phone, code, clientInfo } = opts
  return {
    phone,
    code,
    ...clientInfo
  }
}

export default serverData

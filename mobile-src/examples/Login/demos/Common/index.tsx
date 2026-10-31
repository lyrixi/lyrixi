import React, { useState } from 'react'

import { Device } from 'lyrixi-mobile'

import type { LoginType } from './utils/types'
import CodeLoginPage from './CodeLoginPage'
import PhoneLoginPage from './PhoneLoginPage'
import UserLoginPage from './UserLoginPage'

function Login() {
  const [type, setLoginType] = useState<LoginType>(() =>
    Device.platform === 'lyrixi' ? 'phone' : 'code'
  )

  if (type === 'phone') {
    return <PhoneLoginPage onSwitchLoginType={setLoginType} />
  }
  if (type === 'user') {
    return <UserLoginPage onSwitchLoginType={setLoginType} />
  }
  return <CodeLoginPage onSwitchLoginType={setLoginType} />
}

export default Login

"use strict";(self.webpackChunklyrixi=self.webpackChunklyrixi||[]).push([[2582],{26397:(function(e,n,o){o.r(n),o.d(n,{K:function(){return r.A},p:function(){return t.A}});var t=o(42228),r=o(30803)}),24984:(function(e,n){n.A=`export { default as sendLoginCode } from './sendLoginCode'
export { default as loginByPhoneCode } from './loginByPhoneCode'
`}),87390:(function(e,n){n.A=`import { Loading, LocaleUtil, Request } from 'lyrixi-mobile'

import type { LoginApiResult, LoginClientInfo } from '../../../utils/types'
import serverData from './serverData'

const locale = LocaleUtil.locale

async function loginByPhoneCode(opts: {
  phone: string
  code: string
  clientInfo: LoginClientInfo
}) {
  Loading.open()
  const params = serverData(opts)

  try {
    const result = (await Request.post('/user/login/loginByPhoneCode', params, {
      headers: {
        'content-type': 'application/json'
      }
    })) as LoginApiResult
    Loading.close()
    return result
  } catch (err: unknown) {
    Loading.close()
    const error = err as { data?: { message?: string } }
    return {
      code: '0',
      message: error?.data?.message || String(locale('\u670D\u52A1\u5668\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\uFF01'))
    } as LoginApiResult
  }
}

export default loginByPhoneCode
`}),5059:(function(e,n){n.A=`import type { LoginClientInfo } from '../../../utils/types'

function serverData(opts: { phone: string; code: string; clientInfo: LoginClientInfo }) {
  const { phone, code, clientInfo } = opts
  return {
    phone,
    code,
    ...clientInfo
  }
}

export default serverData
`}),51223:(function(e,n){n.A=`import { Loading, LocaleUtil, Request } from 'lyrixi-mobile'

import type { LoginApiResult } from '../../../utils/types'

const locale = LocaleUtil.locale

async function sendLoginCode(phone: string) {
  Loading.open()

  try {
    const result = (await Request.post(
      '/user/login/sendLoginCode',
      { phone },
      {
        headers: {
          'content-type': 'application/json'
        }
      }
    )) as LoginApiResult
    Loading.close()
    return result
  } catch (err: unknown) {
    Loading.close()
    const error = err as { data?: { message?: string } }
    return {
      code: '0',
      message: error?.data?.message || String(locale('\u670D\u52A1\u5668\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\uFF01'))
    } as LoginApiResult
  }
}

export default sendLoginCode
`}),9873:(function(e,n){n.A=`import React, { useRef, useState } from 'react'

import {
  Button,
  Form,
  Input,
  LocaleUtil,
  Page,
  Text,
  Toast,
  type FieldData,
  type FormRef
} from 'lyrixi-mobile'

import Logo from '../components/Logo'
import SocialButtons from '../components/SocialButtons'
import { getClientInfo } from '../utils/getClientInfo'
import { goHome } from '../utils/goHome'
import { loginByPhoneCode, sendLoginCode } from './api'
import type { CodeLoginPageProps } from './types'
import codeValidator from './utils/codeValidator'
import isValidCode from './utils/isValidCode'
import isValidPhone from './utils/isValidPhone'
import phoneValidator from './utils/phoneValidator'

const locale = LocaleUtil.locale
const SEND_CODE_COOLDOWN = 60

function CodeLoginPage({ onSwitchLoginType }: CodeLoginPageProps) {
  const formRef = useRef<FormRef>(null)
  const countdownRef = useRef<number | null>(null)
  const [countdown, setCountdown] = useState(0)
  const [canLogin, setCanLogin] = useState(false)

  function handleFieldsChange(_changedFields: FieldData[], allFields: FieldData[]) {
    console.log('handleFieldsChange', _changedFields, allFields)
    const values = Object.fromEntries(allFields.map((field) => [field.name, field.value]))
    setCanLogin(isValidPhone(values.phone) && isValidCode(values.code))
  }

  function startCountdown() {
    setCountdown(SEND_CODE_COOLDOWN)
    countdownRef.current = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (countdownRef.current) {
            window.clearInterval(countdownRef.current)
            countdownRef.current = null
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  async function handleSendCode() {
    if (countdown > 0) {
      return
    }

    try {
      await formRef.current?.validateFields(['phone'])
    } catch {
      return
    }

    const phone = String(formRef.current?.getFieldValue('phone') || '').trim()
    const result = await sendLoginCode(phone)
    if (result.code === '1') {
      Toast.open({ content: String(locale('\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001')) })
      startCountdown()
      return
    }

    Toast.open({ content: result.message || String(locale('\u53D1\u9001\u9A8C\u8BC1\u7801\u5931\u8D25')) })
  }

  async function handleLogin() {
    let values: Record<string, unknown>
    try {
      values = (await formRef.current?.validateFields(['phone', 'code'])) || {}
    } catch {
      return
    }

    const phone = String(values.phone || '').trim()
    const code = String(values.code || '').trim()

    const result = await loginByPhoneCode({
      phone,
      code,
      clientInfo: getClientInfo()
    })

    await goHome(result)
  }

  return (
    <Page safeArea style={{ backgroundColor: '#fff' }}>
      <Page.Main>
        <Logo />

        <Form
          ref={formRef}
          content={{ span: 24 }}
          style={{ margin: '40px 40px 0 40px' }}
          onFieldsChange={handleFieldsChange}
        >
          <Form.Item
            className="lyrixi-bg-default"
            style={{
              borderRadius: 40,
              border: 0
            }}
          >
            <Form.Field name="phone" validator={phoneValidator()}>
              <Input.Tel
                style={{ paddingLeft: 12 }}
                placeholder={locale('\u8BF7\u8F93\u5165\u624B\u673A\u53F7') as string}
                maxLength={11}
                allowClear
              />
            </Form.Field>
          </Form.Item>
          <Form.Item
            className="lyrixi-bg-default"
            style={{
              marginTop: 16,
              borderRadius: 40,
              border: 0
            }}
          >
            <Form.Field name="code" span={'auto'} validator={codeValidator()}>
              <Input.Number
                style={{ paddingLeft: 12 }}
                placeholder={locale('\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801') as string}
                inputMode="numeric"
                maxLength={6}
                allowClear
              />
            </Form.Field>
            <Text color="primary" style={{ paddingRight: 12 }} onClick={handleSendCode}>
              {countdown > 0 ? \`\${countdown}s\` : (locale('\u83B7\u53D6\u9A8C\u8BC1\u7801') as string)}
            </Text>
          </Form.Item>
        </Form>

        <Button
          block
          color="primary"
          variant="solid"
          size="l"
          disabled={!canLogin}
          style={{ borderRadius: 40, margin: '32px 40px 0 40px' }}
          onClick={handleLogin}
        >
          {locale('\u767B\u5F55/\u6CE8\u518C') as string}
        </Button>
        <Button
          block
          color="tertiary"
          variant="text"
          onClick={() => onSwitchLoginType('user')}
          style={{ margin: '8px 40px 0 40px' }}
        >
          {locale('\u7528\u6237\u540D/\u5BC6\u7801\u767B\u5F55') as string}
        </Button>
      </Page.Main>
      <Page.Footer style={{ paddingBottom: '48px' }}>
        <SocialButtons />
      </Page.Footer>
    </Page>
  )
}

export default CodeLoginPage
`}),77016:(function(e,n){n.A=`import { LocaleUtil, type FieldValidator } from 'lyrixi-mobile'

import isValidCode from './isValidCode'

const locale = LocaleUtil.locale

function codeValidator(): FieldValidator {
  return (value) => {
    if (!isValidCode(value)) {
      return Promise.reject(new Error(String(locale('\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801'))))
    }
    return Promise.resolve()
  }
}

export default codeValidator
`}),14126:(function(e,n){n.A=`function isValidCode(value: unknown): boolean {
  return /^\\d{6}$/.test(String(value || '').trim())
}

export default isValidCode
`}),83775:(function(e,n){n.A=`import { ValidatorUtil } from 'lyrixi-mobile'

function isValidPhone(value: unknown): boolean {
  return ValidatorUtil.isPhoneNumber(String(value || '').trim()) === true
}

export default isValidPhone
`}),64839:(function(e,n){n.A=`import { LocaleUtil, type FieldValidator } from 'lyrixi-mobile'

import isValidPhone from './isValidPhone'

const locale = LocaleUtil.locale

function phoneValidator(): FieldValidator {
  return (value) => {
    if (!isValidPhone(value)) {
      return Promise.reject(new Error(String(locale('\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u624B\u673A\u53F7'))))
    }
    return Promise.resolve()
  }
}

export default phoneValidator
`}),10176:(function(e,n){n.A=`import { Loading, LocaleUtil, Request } from 'lyrixi-mobile'

import type { LoginApiResult, LoginClientInfo } from '../../../utils/types'
import serverData from './serverData'

const locale = LocaleUtil.locale

async function loginByPhoneOneClick(opts: {
  phone: string
  code: string
  clientInfo: LoginClientInfo
}) {
  Loading.open()
  const params = serverData(opts)

  try {
    const result = (await Request.post('/user/login/loginByPhoneOneClick', params, {
      headers: {
        'content-type': 'application/json'
      }
    })) as LoginApiResult
    Loading.close()
    return result
  } catch (err: unknown) {
    Loading.close()
    const error = err as { data?: { message?: string } }
    return {
      code: '0',
      message: error?.data?.message || String(locale('\u670D\u52A1\u5668\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\uFF01'))
    } as LoginApiResult
  }
}

export default loginByPhoneOneClick
`}),5771:(function(e,n){n.A=`import { Bridge, LocaleUtil } from 'lyrixi-mobile'

import type { QueryPhoneNumberResult } from '../../types'
import type { BridgeCallbackResult, BridgeWithPlatform, PhoneNumberBridgeData } from './types'

const locale = LocaleUtil.locale

function getLyrixiBridge() {
  const bridge = Bridge as BridgeWithPlatform
  return bridge._getCurrentBridge?.('lyrixi')
}

function createResult(
  status: QueryPhoneNumberResult['status'],
  message = '',
  data: QueryPhoneNumberResult['data'] = {
    phoneNumber: '',
    carrierCode: ''
  }
): QueryPhoneNumberResult {
  return {
    status,
    message,
    data
  }
}

async function queryPhoneNumber() {
  return new Promise<QueryPhoneNumberResult>((resolve) => {
    const lyrixiBridge = getLyrixiBridge()
    if (!lyrixiBridge?.getPhoneNumber) {
      resolve(createResult('error', String(locale('\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u4E00\u952E\u767B\u5F55'))))
      return
    }

    lyrixiBridge.getPhoneNumber({
      onSuccess: (result: BridgeCallbackResult<PhoneNumberBridgeData>) => {
        const data = result?.data
        if (data?.phoneNumber && data?.code) {
          resolve(
            createResult('success', '', {
              phoneNumber: data.phoneNumber,
              carrierCode: data.code
            })
          )
          return
        }
        resolve(createResult('error', result?.message || String(locale('\u83B7\u53D6\u672C\u673A\u53F7\u7801\u5931\u8D25'))))
      },
      onError: (error: BridgeCallbackResult) => {
        resolve(createResult('error', error?.message || String(locale('\u83B7\u53D6\u672C\u673A\u53F7\u7801\u5931\u8D25'))))
      }
    })
  })
}

export default queryPhoneNumber
`}),3516:(function(e,n){n.A=`import React, { useEffect, useState } from 'react'

import { Button, DataUtil, Flex, LocaleUtil, Page, Text, Toast } from 'lyrixi-mobile'

import { loginByPhoneOneClick, queryPhoneNumber } from './api'
import { getClientInfo } from '../utils/getClientInfo'
import { goHome } from '../utils/goHome'
import SocialButtons from '../components/SocialButtons'
import type { PhoneLoginPageProps, QueryPhoneNumberResult } from './types'

const locale = LocaleUtil.locale

function PhoneLoginPage({ onSwitchLoginType }: PhoneLoginPageProps) {
  const [result, setResult] = useState<QueryPhoneNumberResult>({
    status: 'loading',
    message: '',
    data: {
      phoneNumber: '',
      carrierCode: ''
    }
  })

  // \u52A0\u8F7D\u624B\u673A\u53F7
  async function loadPhoneNumber() {
    const nextResult = await queryPhoneNumber()
    setResult(nextResult)
    if (nextResult.status === 'error') {
      Toast.open({ content: nextResult.message })
    }
  }

  useEffect(() => {
    loadPhoneNumber()
  }, [])

  async function handleOneClickLogin() {
    const { phoneNumber, carrierCode } = result.data
    if (!phoneNumber || !carrierCode) {
      Toast.open({
        content: String(locale('\u672C\u673A\u53F7\u7801\u672A\u5C31\u7EEA\uFF0C\u8BF7\u4F7F\u7528\u5176\u5B83\u624B\u673A\u53F7\u767B\u5F55'))
      })
      return
    }

    const loginResult = await loginByPhoneOneClick({
      phone: phoneNumber,
      code: carrierCode,
      clientInfo: getClientInfo()
    })

    await goHome(loginResult)
  }

  function renderPhoneText() {
    if (result.status === 'loading') {
      return locale('\u83B7\u53D6\u624B\u673A\u53F7\u7801\u4E2D...') as string
    }
    if (result.status === 'error') {
      return result.message
    }
    return DataUtil.desensitize(result.data.phoneNumber, {
      start: 3,
      end: 7
    })
  }

  return (
    <Page safeArea style={{ backgroundColor: '#fff' }}>
      <Page.Main>
        <Flex justify="center" align="center" direction="vertical" style={{ marginTop: '100px' }}>
          <Text fontSize={28} fontWeight={600}>
            {renderPhoneText()}
          </Text>
          <Text fontSize={12} color="quaternary" style={{ marginTop: '8px' }}>
            {locale('\u672C\u673A\u53F7\u767B\u5F55\uFF0C\u8BA4\u8BC1\u670D\u52A1\u7531\u4E2D\u56FD\u79FB\u52A8\u63D0\u4F9B') as string}
          </Text>
        </Flex>

        <Button
          block
          color="primary"
          variant="solid"
          size="l"
          radius={40}
          disabled={result.status !== 'success'}
          onClick={handleOneClickLogin}
          style={{ margin: '60px 40px 0 40px' }}
        >
          {locale('\u4E00\u952E\u767B\u5F55') as string}
        </Button>
        <Button
          block
          color="quaternary"
          variant="solid"
          size="l"
          radius={40}
          style={{ margin: '16px 40px 0 40px' }}
          onClick={() => onSwitchLoginType('code')}
        >
          {locale('\u5176\u5B83\u624B\u673A\u53F7\u767B\u5F55') as string}
        </Button>

        <Button
          block
          color="tertiary"
          variant="text"
          style={{ margin: '16px 40px 0 40px' }}
          onClick={() => onSwitchLoginType('user')}
        >
          {locale('\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55') as string}
        </Button>
        {/* </Flex> */}
      </Page.Main>
      <Page.Footer style={{ paddingBottom: '48px' }}>
        <SocialButtons />
      </Page.Footer>
    </Page>
  )
}

export default PhoneLoginPage
`}),45399:(function(e,n){n.A=`import { Loading, LocaleUtil, Request } from 'lyrixi-mobile'

import type { LoginApiResult, LoginClientInfo } from '../../../utils/types'
import serverData from './serverData'

const locale = LocaleUtil.locale

async function loginByUsername(opts: {
  username: string
  password: string
  clientInfo: LoginClientInfo
}) {
  Loading.open()
  const params = serverData(opts)

  try {
    const result = (await Request.post('/user/login/loginByUsername', params, {
      headers: {
        'content-type': 'application/json'
      }
    })) as LoginApiResult
    Loading.close()
    return result
  } catch (err: unknown) {
    Loading.close()
    const error = err as { data?: { message?: string } }
    return {
      code: '0',
      message: error?.data?.message || String(locale('\u670D\u52A1\u5668\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\uFF01'))
    } as LoginApiResult
  }
}

export default loginByUsername
`}),61527:(function(e,n){n.A=`import React, { useRef, useState } from 'react'

import { Button, Form, Input, LocaleUtil, Page, type FieldData, type FormRef } from 'lyrixi-mobile'

import Logo from '../components/Logo'
import SocialButtons from '../components/SocialButtons'
import { getClientInfo } from '../utils/getClientInfo'
import { goHome } from '../utils/goHome'
import { loginByUsername } from './api'
import type { UserLoginPageProps } from './types'
import isValidPassword from './utils/isValidPassword'
import isValidUsername from './utils/isValidUsername'
import passwordValidator from './utils/passwordValidator'
import usernameValidator from './utils/usernameValidator'

const locale = LocaleUtil.locale

function UserLoginPage({ onSwitchLoginType }: UserLoginPageProps) {
  const formRef = useRef<FormRef>(null)
  const [canLogin, setCanLogin] = useState(false)

  function handleFieldsChange(_changedFields: FieldData[], allFields: FieldData[]) {
    const values = Object.fromEntries(allFields.map((field) => [field.name, field.value]))
    setCanLogin(isValidUsername(values.username) && isValidPassword(values.password))
  }

  async function handleLogin() {
    let values: Record<string, unknown>
    try {
      values = (await formRef.current?.validateFields(['username', 'password'])) || {}
    } catch {
      return
    }

    const username = String(values.username || '').trim()
    const password = String(values.password || '')

    const result = await loginByUsername({
      username,
      password,
      clientInfo: getClientInfo()
    })

    await goHome(result)
  }

  return (
    <Page safeArea style={{ backgroundColor: '#fff' }}>
      <Page.Main>
        <Logo />

        <Form
          ref={formRef}
          content={{ span: 24 }}
          style={{ margin: '40px 40px 0 40px' }}
          onFieldsChange={handleFieldsChange}
        >
          <Form.Item
            className="lyrixi-bg-default"
            style={{
              borderRadius: 40,
              border: 0
            }}
          >
            <Form.Field name="username" validator={usernameValidator()}>
              <Input.Text
                style={{ paddingLeft: 12 }}
                placeholder={locale('\u8BF7\u8F93\u5165\u90AE\u7BB1\u6216\u624B\u673A\u53F7') as string}
                allowClear
              />
            </Form.Field>
          </Form.Item>
          <Form.Item
            className="lyrixi-bg-default"
            style={{
              marginTop: 16,
              borderRadius: 40,
              border: 0
            }}
          >
            <Form.Field name="password" validator={passwordValidator()}>
              <Input.Password
                style={{ paddingLeft: 12 }}
                placeholder={locale('\u8BF7\u8F93\u5165\u5BC6\u7801') as string}
                allowClear
              />
            </Form.Field>
          </Form.Item>
        </Form>

        <Button
          block
          color="primary"
          variant="solid"
          size="l"
          disabled={!canLogin}
          style={{ borderRadius: 40, margin: '32px 40px 0 40px' }}
          onClick={handleLogin}
        >
          {locale('\u767B\u5F55') as string}
        </Button>
        <Button
          block
          color="tertiary"
          variant="text"
          onClick={() => onSwitchLoginType('code')}
          style={{ margin: '8px 40px 0 40px' }}
        >
          {locale('\u9A8C\u8BC1\u7801\u767B\u5F55') as string}
        </Button>
      </Page.Main>
      <Page.Footer style={{ paddingBottom: '48px' }}>
        <SocialButtons />
      </Page.Footer>
    </Page>
  )
}

export default UserLoginPage
`}),7460:(function(e,n){n.A=`function isValidPassword(value: unknown): boolean {
  return String(value || '').length > 0
}

export default isValidPassword
`}),30443:(function(e,n){n.A=`import { ValidatorUtil } from 'lyrixi-mobile'

function isValidUsername(value: unknown): boolean {
  const username = String(value || '').trim()
  return ValidatorUtil.isPhoneNumber(username) === true || ValidatorUtil.isEmail(username)
}

export default isValidUsername
`}),3642:(function(e,n){n.A=`import { LocaleUtil, type FieldValidator } from 'lyrixi-mobile'

import isValidPassword from './isValidPassword'

const locale = LocaleUtil.locale

function passwordValidator(): FieldValidator {
  return (value) => {
    if (!isValidPassword(value)) {
      return Promise.reject(new Error(String(locale('\u8BF7\u8F93\u5165\u5BC6\u7801'))))
    }
    return Promise.resolve()
  }
}

export default passwordValidator
`}),3399:(function(e,n){n.A=`import { LocaleUtil, type FieldValidator } from 'lyrixi-mobile'

import isValidUsername from './isValidUsername'

const locale = LocaleUtil.locale

function usernameValidator(): FieldValidator {
  return (value) => {
    if (!isValidUsername(value)) {
      return Promise.reject(new Error(String(locale('\u8BF7\u8F93\u5165\u90AE\u7BB1\u6216\u624B\u673A\u53F7'))))
    }
    return Promise.resolve()
  }
}

export default usernameValidator
`}),68422:(function(e,n){n.A=`import type { SVGProps } from 'react'

import { Flex, Icon } from 'lyrixi-mobile'

function LogoSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 72 72" fill="currentColor" aria-hidden {...props}>
      <g transform="translate(0, 8)">
        <path d="M22 40c0-8.284 6.716-15 15-15s15 6.716 15 15v2H22v-2zm15-19a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
      </g>
    </svg>
  )
}

function Logo() {
  return (
    <Flex justify="center" style={{ marginTop: 40 }}>
      <Icon
        svg={LogoSvg}
        size={72}
        color="default"
        variant="filled"
        style={{ borderRadius: '100%' }}
      />
    </Flex>
  )
}

export default Logo
`}),35385:(function(e,n){n.A=`import type { SVGProps } from 'react'

import { Flex, Icon, LocaleUtil, Toast } from 'lyrixi-mobile'

const locale = LocaleUtil.locale

function WeChatSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M8.5 6C5.46 6 3 8.01 3 10.54c0 1.45.78 2.73 2.01 3.57l-.51 1.86 2.14-1.07c.58.16 1.2.24 1.86.24 3.04 0 5.5-2.01 5.5-4.54S11.54 6 8.5 6zm-1.6 2.95c-.39 0-.71-.31-.71-.7 0-.39.32-.7.71-.7.39 0 .71.31.71.7 0 .39-.32.7-.71.7zm3.2 0c-.39 0-.71-.31-.71-.7 0-.39.32-.7.71-.7.39 0 .71.31.71.7 0 .39-.32.7-.71.7zM15.5 8c-2.67 0-4.84 1.76-4.84 3.93 0 2.17 2.17 3.93 4.84 3.93.56 0 1.1-.08 1.6-.23l1.84.92-.44-1.6c.95-.74 1.6-1.84 1.6-3.02C19.34 9.76 18.17 8 15.5 8zm-1.28 2.56c-.31 0-.56-.25-.56-.56 0-.31.25-.56.56-.56.31 0 .56.25.56.56 0 .31-.25.56-.56.56zm2.56 0c-.31 0-.56-.25-.56-.56 0-.31.25-.56.56-.56.31 0 .56.25.56.56 0 .31-.25.56-.56.56z" />
    </svg>
  )
}

function QqSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 4c-4.42 0-8 2.69-8 6 0 1.86 1.02 3.53 2.62 4.64L6 17l2.53-1.27c.97.27 2 .42 3.07.42 4.42 0 8-2.69 8-6s-3.58-6-8-6z" />
    </svg>
  )
}

const socialIconStyle = {
  width: 44,
  height: 44,
  padding: 4,
  borderRadius: '50%',
  color: '#fff'
}

function SocialButtons() {
  function handleWeChatLogin() {
    Toast.open({ content: String(locale('\u5FAE\u4FE1\u767B\u5F55\u5373\u5C06\u4E0A\u7EBF')) })
  }

  function handleQqLogin() {
    Toast.open({ content: String(locale('QQ \u767B\u5F55\u5373\u5C06\u4E0A\u7EBF')) })
  }

  return (
    <Flex justify="center" align="center" gap={32} style={{ marginTop: 'auto', paddingTop: 32 }}>
      <Icon
        svg={WeChatSvg}
        size={22}
        style={{ ...socialIconStyle, background: '#07c160' }}
        onClick={handleWeChatLogin}
      />
      <Icon
        svg={QqSvg}
        size={22}
        style={{ ...socialIconStyle, background: '#12b7f5' }}
        onClick={handleQqLogin}
      />
    </Flex>
  )
}

export default SocialButtons
`}),25675:(function(e,n){n.A=`import React, { useState } from 'react'

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
`}),12564:(function(e,n){n.A=`import { Device } from 'lyrixi-mobile'

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
`}),86752:(function(e,n){n.A=`import { LocaleUtil, Router, Storage, Toast } from 'lyrixi-mobile'

import type { LoginApiResult } from './types'

const locale = LocaleUtil.locale
const LOGIN_TOKEN_KEY = 'education:login:token'
const HOME_ROUTE = '/main'

async function saveLoginToken(token: string) {
  await Storage.setItem(LOGIN_TOKEN_KEY, token)
}

export async function goHome(result: LoginApiResult) {
  if (result.code === '1' && result.data?.token) {
    await saveLoginToken(result.data.token)
    Router.replace(HOME_ROUTE)
    return true
  }

  Toast.open({
    content: result.message || String(locale('\u767B\u5F55\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5'))
  })
  return false
}
`})}]);

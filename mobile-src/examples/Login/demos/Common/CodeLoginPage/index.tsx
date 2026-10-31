import React, { useRef, useState } from 'react'

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
      Toast.open({ content: String(locale('验证码已发送')) })
      startCountdown()
      return
    }

    Toast.open({ content: result.message || String(locale('发送验证码失败')) })
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
                placeholder={locale('请输入手机号') as string}
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
                placeholder={locale('请输入验证码') as string}
                inputMode="numeric"
                maxLength={6}
                allowClear
              />
            </Form.Field>
            <Text color="primary" style={{ paddingRight: 12 }} onClick={handleSendCode}>
              {countdown > 0 ? `${countdown}s` : (locale('获取验证码') as string)}
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
          {locale('登录/注册') as string}
        </Button>
        <Button
          block
          color="tertiary"
          variant="text"
          onClick={() => onSwitchLoginType('user')}
          style={{ margin: '8px 40px 0 40px' }}
        >
          {locale('用户名/密码登录') as string}
        </Button>
      </Page.Main>
      <Page.Footer style={{ paddingBottom: '48px' }}>
        <SocialButtons />
      </Page.Footer>
    </Page>
  )
}

export default CodeLoginPage

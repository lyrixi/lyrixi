import React, { useRef, useState } from 'react'

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
                placeholder={locale('请输入邮箱或手机号') as string}
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
                placeholder={locale('请输入密码') as string}
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
          {locale('登录') as string}
        </Button>
        <Button
          block
          color="tertiary"
          variant="text"
          onClick={() => onSwitchLoginType('code')}
          style={{ margin: '8px 40px 0 40px' }}
        >
          {locale('验证码登录') as string}
        </Button>
      </Page.Main>
      <Page.Footer style={{ paddingBottom: '48px' }}>
        <SocialButtons />
      </Page.Footer>
    </Page>
  )
}

export default UserLoginPage

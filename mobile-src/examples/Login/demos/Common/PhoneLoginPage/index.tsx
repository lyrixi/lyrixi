import React, { useEffect, useState } from 'react'

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

  // 加载手机号
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
        content: String(locale('本机号码未就绪，请使用其它手机号登录'))
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
      return locale('获取手机号码中...') as string
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
            {locale('本机号登录，认证服务由中国移动提供') as string}
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
          {locale('一键登录') as string}
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
          {locale('其它手机号登录') as string}
        </Button>

        <Button
          block
          color="tertiary"
          variant="text"
          style={{ margin: '16px 40px 0 40px' }}
          onClick={() => onSwitchLoginType('user')}
        >
          {locale('用户名密码登录') as string}
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

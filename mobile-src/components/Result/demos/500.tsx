import React from 'react'
import { Page, Result, Button, LocaleUtil, Bridge } from 'lyrixi-mobile'

export default function Result500Demo() {
  return (
    <Page>
      <Page.Main>
        <Result status={'500'}>
          <Button
            radius="l"
            variant="solid"
            color="primary"
            style={{ margin: '77px 12px 0 12px' }}
            onClick={() => {
              window.location.reload()
            }}
          >
            {LocaleUtil.locale('重试')}
          </Button>
          <Button
            radius="l"
            style={{ margin: '12px 12px 0 12px' }}
            onClick={() => {
              Bridge.navigateBack({ steps: 1 })
            }}
          >
            {LocaleUtil.locale('返回')}
          </Button>
        </Result>
      </Page.Main>
    </Page>
  )
}

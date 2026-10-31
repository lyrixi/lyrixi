import React from 'react'

import { FooterBar, LocaleUtil, Page } from 'lyrixi-mobile'

import type { ListDemoCommonFooterProps } from './types'

const locale = LocaleUtil.locale

// 底部
function Footer({ ok, cancel, onOk, onCancel }: ListDemoCommonFooterProps) {
  return (
    <Page.Footer>
      <FooterBar>
        {onCancel && (
          <FooterBar.Button block variant="filled" color="default" onClick={onCancel}>
            {cancel || locale('Cancel')}
          </FooterBar.Button>
        )}
        {onOk && (
          <FooterBar.Button block variant="solid" color="primary" onClick={onOk}>
            {ok || locale('Ok')}
          </FooterBar.Button>
        )}
      </FooterBar>
    </Page.Footer>
  )
}

export default Footer

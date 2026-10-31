import React from 'react'

import { FooterBar, LocaleUtil, Page } from 'lyrixi-mobile'

import type { FooterProps } from './types'

const locale = LocaleUtil.locale

// 底部
function Footer({ onOk, onCancel }: FooterProps) {
  return (
    <Page.Footer>
      <FooterBar>
        {onCancel && (
          <FooterBar.Button block variant="filled" color="default" onClick={onCancel}>
            {locale('Cancel')}
          </FooterBar.Button>
        )}
        {onOk && (
          <FooterBar.Button block variant="solid" color="primary" onClick={onOk}>
            {locale('Ok')}
          </FooterBar.Button>
        )}
      </FooterBar>
    </Page.Footer>
  )
}

export default Footer

import React from 'react'
import vconsole from 'vconsole'

import { MathUtil, Page, Divider } from 'lyrixi-mobile'

new vconsole()

export default function MathUtilDemo() {
  return (
    <Page>
      <Page.Main>
        <h2>组件</h2>
        <Divider>计算</Divider>
        {MathUtil.strip(0.1 * 0.2)}
      </Page.Main>
    </Page>
  )
}

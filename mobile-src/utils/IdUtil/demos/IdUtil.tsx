import React from 'react'
import { Card, Divider, IdUtil, Page } from 'lyrixi-mobile'

export default function IdUtilDemo() {
  return (
    <Page>
      <Page.Main>
        <Card>
          <Divider>randomUUID()</Divider>
          <div style={{ margin: '0 12px' }}>
            生成类 UUID 字符串（如 xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx）。
          </div>
          <div style={{ margin: '4px 12px' }}>IdUtil.randomUUID() → {IdUtil.randomUUID()}</div>
        </Card>
      </Page.Main>
    </Page>
  )
}

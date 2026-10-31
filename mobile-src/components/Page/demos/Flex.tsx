import React from 'react'
import { Page, Flex } from 'lyrixi-mobile'

export default function FlexDemo() {
  return (
    <Page full={false} style={{ height: '200px' }}>
      <Page.Header style={{ height: '44px', backgroundColor: '#7dbcea' }}>Page.Header</Page.Header>
      <Flex flex={1} direction="horizontal" style={{ overflow: 'hidden' }}>
        <Page.Aside style={{ width: '80px', backgroundColor: '#3ba0e9' }}>Page.Aside</Page.Aside>
        <Page.Main style={{ backgroundColor: 'rgba(16, 142, 233, 1)' }}>Page.Main</Page.Main>
      </Flex>
      <Page.Footer safeArea style={{ height: '44px', backgroundColor: '#7dbcea' }}>
        Page.Footer
      </Page.Footer>
    </Page>
  )
}

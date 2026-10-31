import React from 'react'
import { Page, Loading, Divider, Flex } from 'lyrixi-mobile'

export default function LoadingOuroborosDemo() {
  return (
    <Page>
      <Page.Main>
        <Divider>基础用法</Divider>
        <Loading.Ouroboros />

        <Divider>Size</Divider>
        <Flex align="center" gap={12}>
          <Loading.Ouroboros size="xs" />
          <Loading.Ouroboros size="s" />
          <Loading.Ouroboros size="m" />
          <Loading.Ouroboros size="l" />
          <Loading.Ouroboros size="xl" />
          <Loading.Ouroboros size="xxl" />
        </Flex>
      </Page.Main>
    </Page>
  )
}

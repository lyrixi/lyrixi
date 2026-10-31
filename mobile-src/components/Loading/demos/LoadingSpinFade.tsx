import React from 'react'
import { Page, Loading, Divider, Flex } from 'lyrixi-mobile'

export default function LoadingSpinFadeDemo() {
  return (
    <Page>
      <Page.Main>
        <Divider>基础用法</Divider>
        <Loading.SpinFade />

        <Divider>Size</Divider>
        <Flex align="center" gap={12}>
          <Loading.SpinFade size="xs" />
          <Loading.SpinFade size="s" />
          <Loading.SpinFade size="m" />
          <Loading.SpinFade size="l" />
          <Loading.SpinFade size="xl" />
          <Loading.SpinFade size="xxl" />
        </Flex>
      </Page.Main>
    </Page>
  )
}

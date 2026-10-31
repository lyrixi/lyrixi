import React from 'react'
import { Page, Loading, Divider, Flex } from 'lyrixi-mobile'

export default function LoadingBallWaveDemo() {
  return (
    <Page>
      <Page.Main>
        <Divider>基础用法</Divider>
        <Loading.BallWave />

        <Divider>Size</Divider>
        <Flex align="center" gap={12}>
          <Loading.BallWave size="xs" />
          <Loading.BallWave size="s" />
          <Loading.BallWave size="m" />
          <Loading.BallWave size="l" />
          <Loading.BallWave size="xl" />
          <Loading.BallWave size="xxl" />
        </Flex>
      </Page.Main>
    </Page>
  )
}

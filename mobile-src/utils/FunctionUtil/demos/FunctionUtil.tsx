import React, { useMemo, useState } from 'react'
import { Button, Card, Divider, FunctionUtil, Page } from 'lyrixi-mobile'

export default function FunctionUtilDemo() {
  const [count, setCount] = useState(0)
  const [throttleCount, setThrottleCount] = useState(0)

  const handleDebounceClick = useMemo(
    () =>
      FunctionUtil.debounce(() => {
        setCount((prev) => prev + 1)
      }, 1000),
    []
  )

  const handleThrottleClick = useMemo(
    () =>
      FunctionUtil.throttle(() => {
        setThrottleCount((prev) => prev + 1)
      }, 1000),
    []
  )

  return (
    <Page>
      <Page.Main>
        <Card>
          <Divider>debounce(func, wait?, options?)</Divider>
          <div style={{ margin: '0 12px' }}>
            连续点击时只会计入最后一次：1 秒内再次点击会重新计时。
          </div>
          <div style={{ margin: '4px 12px' }}>count → {count}</div>
          <div style={{ margin: '4px 12px' }}>
            <Button onClick={handleDebounceClick}>点击 +1（防抖 1000ms）</Button>
          </div>
          <Divider>throttle(func, wait?, options?)</Divider>
          <div style={{ margin: '0 12px' }}>连续点击时 1 秒内最多计入一次。</div>
          <div style={{ margin: '4px 12px' }}>throttleCount → {throttleCount}</div>
          <div style={{ margin: '4px 12px' }}>
            <Button onClick={handleThrottleClick}>点击 +1（节流 1000ms）</Button>
          </div>
        </Card>
      </Page.Main>
    </Page>
  )
}

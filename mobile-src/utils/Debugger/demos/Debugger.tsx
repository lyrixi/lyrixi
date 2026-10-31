import React, { useEffect, useRef } from 'react'
import { Page, Button, Debugger, Flex } from 'lyrixi-mobile'

/**
 * 绑定调试后门：连续点击指定次数后打开 vconsole
 * （原 App debugElement 能力，业务侧可按需自行绑定）
 */
function bindDebugger(
  element: (HTMLElement & { hasEventListener?: boolean }) | null | undefined,
  count = 10
): void {
  if (!element || element.hasEventListener) return

  let clickCount = 0
  element.hasEventListener = true
  element.addEventListener('click', () => {
    clickCount++
    if (clickCount >= count) {
      clickCount = 0
      void Debugger.open()
    }
  })
}

export default function DebuggerDemo() {
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bindDebugger(triggerRef.current)
  }, [])

  return (
    <Page>
      <Page.Main>
        <div ref={triggerRef} style={{ padding: '12px 0', color: 'var(--lyrixi-color-secondary)' }}>
          连续点击此处 10 次可打开调试面板（后门）
        </div>
        <Flex gap={12}>
          <Button
            color="primary"
            onClick={() => {
              void Debugger.open()
            }}
          >
            打开 vconsole
          </Button>
          <Button
            onClick={() => {
              Debugger.close()
            }}
          >
            关闭 vconsole
          </Button>
        </Flex>
      </Page.Main>
    </Page>
  )
}

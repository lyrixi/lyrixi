import React, { useEffect, useRef } from 'react'
import { EventBus, Page, Button, Card, Toast } from 'lyrixi-mobile'

const EVENT = 'demo:message'

export default function EventBusDemo() {
  const handlerRef = useRef<((...args: unknown[]) => void) | undefined>(undefined)

  useEffect(() => {
    return () => EventBus.destroy(EVENT)
  }, [])

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>字面量</Card.Header>
          <Card.Main>
            <Button
              block
              radius="m"
              color="primary"
              style={{ margin: '10px 12px' }}
              onClick={() => {
                if (handlerRef.current) return
                const handler = (...args: unknown[]) => {
                  Toast.open({ content: `收到: ${JSON.stringify(args)}` })
                }
                handlerRef.current = handler
                EventBus.on(EVENT, handler)
                Toast.open({ content: '已订阅' })
              }}
            >
              on
            </Button>
            <Button
              block
              radius="m"
              color="primary"
              style={{ margin: '10px 12px' }}
              onClick={() => {
                if (!EventBus.emit(EVENT, { text: 'hello' })) {
                  Toast.open({ content: '请先 on' })
                }
              }}
            >
              emit
            </Button>
            <Button
              block
              radius="m"
              style={{ margin: '10px 12px' }}
              onClick={() => {
                if (!handlerRef.current) return
                EventBus.off(EVENT, handlerRef.current)
                handlerRef.current = undefined
                Toast.open({ content: '已取消订阅' })
              }}
            >
              off
            </Button>
            <Button
              block
              radius="m"
              style={{ margin: '10px 12px' }}
              onClick={() => {
                EventBus.destroy(EVENT)
                handlerRef.current = undefined
                Toast.open({ content: '已销毁' })
              }}
            >
              destroy
            </Button>
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

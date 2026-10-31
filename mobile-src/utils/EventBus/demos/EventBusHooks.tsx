import React from 'react'
import { EventBus, Page, Button, Card, Toast } from 'lyrixi-mobile'

const EVENT = 'demo:hook-message'

export default function EventBusHooksDemo() {
  const emit = EventBus.useEmit()

  EventBus.useOn(EVENT, (...args: unknown[]) => {
    Toast.open({ content: `收到: ${JSON.stringify(args)}` })
  })

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>钩子</Card.Header>
          <Card.Main>
            <Button
              block
              radius="m"
              color="primary"
              style={{ margin: '10px 12px' }}
              onClick={() => {
                if (!emit(EVENT, { text: 'hello' })) {
                  Toast.open({ content: '无监听者' })
                }
              }}
            >
              useEmit
            </Button>
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

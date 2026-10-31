import React, { useEffect, useState } from 'react'
import { Button, Card, Page, Router, Toast, type RouterAction } from 'lyrixi-mobile'

export default function RouterDemo() {
  const [action, setAction] = useState<RouterAction | undefined>()

  useEffect(() => {
    // 演示：注入本地 mock 导航实现
    Router.config({
      push: (name, params) => {
        Toast.open({ content: `push → ${name} ${JSON.stringify(params ?? {})}` })
      },
      replace: (name, params) => {
        Toast.open({ content: `replace → ${name} ${JSON.stringify(params ?? {})}` })
      },
      back: () => {
        Toast.open({ content: 'back' })
      }
    })
  }, [])

  function refreshAction() {
    setAction(Router.getAction())
  }

  return (
    <Page>
      <Page.Main>
        <Card style={{ margin: 12 }}>
          <Card.Header>Router</Card.Header>
          <Card.Main>
            <div style={{ marginBottom: 12 }}>getAction: {action ?? '-'}</div>
            <Button
              color="primary"
              radius="m"
              block
              style={{ marginBottom: 8 }}
              onClick={() => {
                Router.push('user', { id: 1 })
                refreshAction()
              }}
            >
              push user
            </Button>
            <Button
              color="primary"
              radius="m"
              block
              style={{ marginBottom: 8 }}
              onClick={() => {
                Router.replace('login')
                refreshAction()
              }}
            >
              replace login
            </Button>
            <Button
              color="primary"
              radius="m"
              block
              onClick={() => {
                Router.back()
                refreshAction()
              }}
            >
              back
            </Button>
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

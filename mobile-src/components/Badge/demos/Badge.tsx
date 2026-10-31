import React from 'react'
import { Page, Card, Badge } from 'lyrixi-mobile'

export default function BadgeDemo() {
  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Count</Card.Header>
          <Card.Main>
            <Badge count={5} />
            <Badge count={100} />
          </Card.Main>
        </Card>
        <Card>
          <Card.Header>Max Count</Card.Header>
          <Card.Main>
            <Badge count={1000} maxCount={99} />
            <Badge count={1000} maxCount={99} ellipsis="..." />
          </Card.Main>
        </Card>
        <Card>
          <Card.Header>With Children</Card.Header>
          <Card.Main>
            <Badge count={5}>消息</Badge>
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

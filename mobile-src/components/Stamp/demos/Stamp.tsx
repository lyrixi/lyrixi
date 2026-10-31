import React from 'react'
import { Page, Card, Stamp } from 'lyrixi-mobile'

export default function StampDemo() {
  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Colors</Card.Header>
          <Card.Main>
            <Stamp color="primary">Primary</Stamp>
            <Stamp color="info">Link</Stamp>
            <Stamp color="warning">Warning</Stamp>
            <Stamp color="danger">Danger</Stamp>
            <Stamp color="success">Success</Stamp>
            <Stamp color="disabled">Disabled</Stamp>
          </Card.Main>
        </Card>
        <Card>
          <Card.Header>Custom Color: iOS 16.2+ / Android Chrome 111+</Card.Header>
          <Card.Main>
            <Stamp color="#ff8800">ff8800</Stamp>
          </Card.Main>
        </Card>
        <Card>
          <Card.Header>Shapes</Card.Header>
          <Card.Main>
            <Stamp color="primary">Round</Stamp>
            <Stamp color="primary" shape="rect">
              Primary
            </Stamp>
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

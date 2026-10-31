import React from 'react'
import { Page, Card } from 'lyrixi-mobile'

export default function CardDemo() {
  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Header</Card.Header>
          <Card.Main>Content content</Card.Main>
        </Card>
        <Card radius="s">
          <Card.Header>radius s</Card.Header>
          <Card.Main>Content content</Card.Main>
        </Card>
        <Card radius="m">
          <Card.Header>radius m</Card.Header>
          <Card.Main>Content content</Card.Main>
        </Card>
        <Card radius="l">
          <Card.Header>radius l</Card.Header>
          <Card.Main>Content content</Card.Main>
        </Card>
        <Card radius={20}>
          <Card.Header>radius 20</Card.Header>
          <Card.Main>Content content</Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

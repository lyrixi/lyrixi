import React from 'react'
import { Page, Card, Flex, Button, type ButtonItem } from 'lyrixi-mobile'

const list: ButtonItem[] = [
  {
    id: '1',
    name: 'Content',
    onClick: () => {
      console.log('Content')
    }
  },
  {
    id: '2',
    name: 'Sent',
    onClick: () => {
      console.log('Sent')
    }
  },
  {
    id: '3',
    name: 'Retry',
    onClick: () => {
      console.log('Retry')
    }
  }
]

export default function ButtonGroupDemo() {
  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Basic</Card.Header>
          <Card.Main>
            <Button.Group size="m" list={list} />
          </Card.Main>
        </Card>
        <Card>
          <Card.Header>Block</Card.Header>
          <Card.Main>
            <Button.Group block list={list} />
          </Card.Main>
        </Card>
        <Card>
          <Card.Header>Size</Card.Header>
          <Card.Main>
            <Flex direction="vertical">
              <Button.Group size="s" list={list} />
              <Button.Group size="m" list={list} />
              <Button.Group size="l" list={list} />
            </Flex>
          </Card.Main>
        </Card>
        <Card>
          <Card.Header>Radius</Card.Header>
          <Card.Main>
            <Flex direction="vertical">
              <Button.Group radius="s" list={list} />
              <Button.Group radius="m" list={list} />
              <Button.Group radius="l" list={list} />
            </Flex>
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

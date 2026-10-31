import React from 'react'
import { Page, Divider, Steps, Icon, Card, Icons } from 'lyrixi-mobile'

const list = [
  {
    icon: <Icon svg={Icons.Signature} />,
    id: 'finish',
    title: 'Finished',
    description: 'This is a description.'
  },
  {
    icon: <Icon svg={Icons.Signature} />,
    id: 'progress',
    title: 'In Progress',
    description: 'This is a description.'
  },
  {
    icon: <Icon svg={Icons.Signature} />,
    id: 'wait',
    title: 'Waiting',
    description: 'This is a description.'
  }
]

export default function IconDemo2() {
  return (
    <Page>
      <Page.Main>
        <Card>
          <Divider>Global Icon</Divider>
          <Steps iconSize={32} value={{ index: 1 }} list={list} direction="horizontal" />
        </Card>

        <Card>
          <Divider>Item Icon</Divider>
          <Steps
            iconSize={32}
            value={{
              index: 1,
              icon: <Icon svg={Icons.Signature} />
            }}
            list={list}
            direction="vertical"
          />
        </Card>
      </Page.Main>
    </Page>
  )
}

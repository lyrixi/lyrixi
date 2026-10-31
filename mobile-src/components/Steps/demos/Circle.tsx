import React from 'react'
import { Page, Divider, Steps, Card } from 'lyrixi-mobile'

const list = [
  {
    id: 'finish',
    title: 'Finished',
    description: 'This is a description.'
  },
  {
    id: 'progress',
    title: 'In Progress',
    description: 'This is a description.'
  },
  {
    id: 'wait',
    title: 'Waiting',
    description: 'This is a description.'
  }
]

export default function CircleDemo() {
  return (
    <Page>
      <Page.Main>
        <Card>
          <Divider>Center & Horizontal</Divider>
          <Steps
            iconSize={24}
            value={{ index: 1 }}
            list={list}
            align="center"
            direction="horizontal"
          />
        </Card>

        <Card>
          <Divider>Center & Vertical</Divider>
          <Steps
            iconSize={24}
            value={{ index: 1 }}
            list={list}
            align="center"
            direction="vertical"
          />
        </Card>

        <Card>
          <Divider>Left & Horizontal</Divider>
          <Steps
            iconSize={24}
            value={{ index: 1 }}
            list={list}
            align="left"
            direction="horizontal"
          />
        </Card>

        <Card>
          <Divider>Left & Vertical</Divider>
          <Steps iconSize={24} value={{ index: 1 }} list={list} align="left" direction="vertical" />
        </Card>
      </Page.Main>
    </Page>
  )
}

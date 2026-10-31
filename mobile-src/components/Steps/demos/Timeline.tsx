import React from 'react'
import { Page, Divider, Steps, Card, List, Button } from 'lyrixi-mobile'

const list = [
  {
    id: 'finish',
    title: <p className="lyrixi-color-tertiary">2025-12-01 12:30:27</p>,
    description: (
      <div className="lyrixi-color-default">
        <List.Item
          avatarUrl="https://api.dicebear.com/7.x/miniavs/svg"
          title="Jerry Input"
          className="border-0"
        />
      </div>
    )
  },
  {
    id: 'progress',
    title: <p className="lyrixi-color-tertiary">2025-12-01 12:30:27</p>,
    description: (
      <div className="lyrixi-color-default">
        <List.Item
          avatarUrl="https://api.dicebear.com/7.x/miniavs/svg"
          title="Tom Input"
          className="border-0"
        />
      </div>
    )
  },
  {
    id: 'wait',
    title: <p className="lyrixi-color-tertiary">2025-12-01 12:30:27</p>,
    description: (
      <div className="lyrixi-color-default">
        <List.Item
          avatarUrl="https://api.dicebear.com/7.x/miniavs/svg"
          title="Morpheus Input"
          className="border-0"
        />
        <p className="lyrixi-font-size-l">Wait for the boss to handle.</p>
        <Button size="s" radius="m" style={{ marginTop: '8px' }}>
          View detail
        </Button>
      </div>
    )
  }
]

export default function TimelineDemo() {
  return (
    <Page>
      <Page.Main>
        <Card>
          <Divider>Center & Vertical</Divider>
          <Steps value={{ index: 1 }} list={list} align="center" direction="vertical" />
        </Card>
      </Page.Main>
    </Page>
  )
}

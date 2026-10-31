import React, { useState } from 'react'
import { Page, List, Card } from 'lyrixi-mobile'
import type { ListItem } from 'lyrixi-mobile'
import listData from './listData'

export default function ListHeaderItemDemo() {
  const [singleValue, setSingleValue] = useState<ListItem | ListItem[] | null>(null)

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>List.HeaderItem（分组标题）</Card.Header>
          <Card.Main>
            <List.HeaderItem title="Group Title" description="Group Description" />
            <List
              list={listData}
              value={singleValue}
              onChange={(v) => setSingleValue(v)}
              checkable
              allowClear
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

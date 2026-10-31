import React, { useState } from 'react'
import { Card, Page, Transfer, type TransferItem } from 'lyrixi-mobile'

export default function TransferDemo() {
  const [value, setValue] = useState<TransferItem[]>([{ id: '1', name: '选项1' }])
  const list = [
    { id: '1', name: '选项1' },
    { id: '2', name: '选项2' },
    { id: '3', name: '选项3' },
    { id: '4', name: '选项4' },
    { id: '5', name: '选项5' }
  ]
  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Transfer 穿梭框</Card.Header>
          <Card.Main>
            <Transfer.Main
              list={list}
              value={value}
              titles={{ source: '待选择', target: '已选择' }}
              onChange={(v) => setValue(v)}
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

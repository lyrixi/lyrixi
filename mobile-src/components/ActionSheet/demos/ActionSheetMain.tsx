import React, { useState } from 'react'
import { Page, ActionSheet, type ListItem } from 'lyrixi-mobile'

export default function ActionSheetMainDemo() {
  const list: ListItem[] = [
    { id: '1', name: '测试1' },
    { id: '2', name: '测试2' },
    { id: '3', name: '测试3' }
  ]
  const [value, setValue] = useState<ListItem | null>(null)

  return (
    <Page>
      <Page.Main>
        {JSON.stringify(value)}
        <ActionSheet.Main
          value={value}
          list={list}
          onChange={(item) => {
            console.log('onChange:', item)
            setValue(item)
          }}
        />
      </Page.Main>
    </Page>
  )
}

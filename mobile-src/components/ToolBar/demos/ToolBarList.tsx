import React, { useState } from 'react'
import { Page, ToolBar, type ToolBarItem } from 'lyrixi-mobile'

export default function ToolBarListDemo() {
  const [item, setItem] = useState<ToolBarItem | null>({
    disabled: true,
    id: '',
    name: 'Disabled'
  })

  return (
    <Page>
      <Page.Main>
        <ToolBar.List
          value={item}
          onChange={(v) => setItem(Array.isArray(v) ? v[0] ?? null : v ?? null)}
          list={[
            {
              disabled: true,
              id: '',
              name: 'Disabled'
            },
            {
              id: '1',
              name: 'Option1'
            },
            {
              id: '2',
              name: 'Option2'
            }
          ]}
        />
      </Page.Main>
    </Page>
  )
}

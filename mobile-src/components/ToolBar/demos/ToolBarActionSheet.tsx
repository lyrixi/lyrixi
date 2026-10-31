import React, { useState } from 'react'
import { Page, ToolBar, type ListItem } from 'lyrixi-mobile'

export default function ToolBarActionSheetDemo() {
  const [item, setItem] = useState<ListItem | null>({
    disabled: true,
    id: '',
    name: 'Disabled'
  })

  return (
    <Page>
      <Page.Main>
        <ToolBar.ActionSheet
          value={item}
          onChange={(v) => setItem(v ?? null)}
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

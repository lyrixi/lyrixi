import React from 'react'
import { Page, ToolBar } from 'lyrixi-mobile'

export default function ToolBarSearchDemo() {
  return (
    <Page className="lyrixi-bg-white">
      <Page.Main>
        <ToolBar>
          <ToolBar.Search placeholder="Search" value="" onSearch={() => {}} />
        </ToolBar>
      </Page.Main>
    </Page>
  )
}

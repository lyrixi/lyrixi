import React from 'react'
import { Page, ToolBar } from 'lyrixi-mobile'

export default function ToolBarCompactDemo() {
  return (
    <Page>
      <Page.Main>
        <ToolBar>
          <ToolBar.Compact>
            <ToolBar.Button>1</ToolBar.Button>
            <ToolBar.Button>2</ToolBar.Button>
            <ToolBar.Button>3</ToolBar.Button>
          </ToolBar.Compact>
          <ToolBar.Compact separator={false}>
            <ToolBar.Button>A</ToolBar.Button>
            <ToolBar.Button>B</ToolBar.Button>
            <ToolBar.Button>C</ToolBar.Button>
          </ToolBar.Compact>
        </ToolBar>
      </Page.Main>
    </Page>
  )
}

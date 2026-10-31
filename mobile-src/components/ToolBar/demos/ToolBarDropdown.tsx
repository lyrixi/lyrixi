import React, { useRef } from 'react'
import { Page, ToolBar, Button, type ToolBarDropdownRef } from 'lyrixi-mobile'

export default function ToolBarDropdownDemo() {
  const dropdownRef = useRef<ToolBarDropdownRef | null>(null)

  return (
    <Page>
      <Page.Header>
        <ToolBar>
          <ToolBar.Dropdown
            left={12}
            color="primary"
            modalRender={() => {
              return <div style={{ height: '300px' }}>Modal Content</div>
            }}
          >
            Dropdown left
          </ToolBar.Dropdown>

          <ToolBar.Dropdown
            modalRender={() => {
              return <div style={{ height: '300px' }}>Modal Content</div>
            }}
            ref={dropdownRef}
          >
            Dropdown ref
          </ToolBar.Dropdown>

          <ToolBar.Dropdown
            right={12}
            modalRender={() => {
              return <div style={{ height: '300px' }}>Modal Content</div>
            }}
          >
            Dropdown right
          </ToolBar.Dropdown>
        </ToolBar>
        <Page.Main>
          <Button
            onClick={() => {
              dropdownRef.current?.open()
            }}
          >
            Click to open dropdown
          </Button>
        </Page.Main>
      </Page.Header>
    </Page>
  )
}

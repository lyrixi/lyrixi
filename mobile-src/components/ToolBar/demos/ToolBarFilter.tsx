import React from 'react'
import { Page, ToolBar } from 'lyrixi-mobile'
import FilterFooter from './FilterFooter'

export default function ToolBarFilterDemo() {
  return (
    <Page>
      <Page.Main>
        <ToolBar.Filter
          modalRender={() => {
            return <div>Modal Content</div>
          }}
          footerRender={({ onClose }) => {
            return <FilterFooter onClose={onClose} />
          }}
        />
      </Page.Main>
    </Page>
  )
}

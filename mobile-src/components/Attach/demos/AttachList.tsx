import React from 'react'
import { Page, Attach } from 'lyrixi-mobile'

export default function AttachListDemo() {
  return (
    <Page>
      <Page.Main>
        <Attach.List list={[]} onChange={() => {}} />
      </Page.Main>
    </Page>
  )
}

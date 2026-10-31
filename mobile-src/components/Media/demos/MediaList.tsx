import React from 'react'
import { Page, Media } from 'lyrixi-mobile'

export default function MediaListDemo() {
  return (
    <Page>
      <Page.Main>
        <Media.List list={[]} />
      </Page.Main>
    </Page>
  )
}

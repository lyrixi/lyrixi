import React from 'react'
import { Page, Media } from 'lyrixi-mobile'

export default function MediaPreviewMainDemo() {
  return (
    <Page>
      <Page.Main>
        <Media.PreviewMain list={[]} open={false} />
      </Page.Main>
    </Page>
  )
}

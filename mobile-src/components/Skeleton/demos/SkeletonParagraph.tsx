import React from 'react'
import { Page, Skeleton } from 'lyrixi-mobile'

export default function SkeletonParagraphDemo() {
  return (
    <Page>
      <Page.Main>
        <Skeleton.Paragraph length={3} />
      </Page.Main>
    </Page>
  )
}

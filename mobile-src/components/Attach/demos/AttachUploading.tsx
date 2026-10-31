import React from 'react'
import { Page, Attach } from 'lyrixi-mobile'

export default function AttachUploadingDemo() {
  return (
    <Page>
      <Page.Main>
        <Attach.Uploading
          uploadingType="demo"
          className="demo-attach-uploading"
          uploadingRender={({ uploadingType }) => <span>{uploadingType}</span>}
        />
      </Page.Main>
    </Page>
  )
}

import React from 'react'
import { Signature, Page } from 'lyrixi-mobile'

export default function SignatureMainDemo() {
  return (
    <Page>
      <Page.Header className="lyrixi-text-center">手写签名</Page.Header>
      <Page.Main className="lyrixi-bg-white">
        <Signature.Main
          style={{ height: 400 }}
          onChange={(base64) => {
            console.log(base64)
          }}
        />
      </Page.Main>
    </Page>
  )
}

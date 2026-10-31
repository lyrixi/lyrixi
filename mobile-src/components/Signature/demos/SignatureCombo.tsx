import React, { useEffect, useState } from 'react'
import { Signature, Page, Bridge } from 'lyrixi-mobile'

// Test safe area
// import { SafeArea } from 'lyrixi-mobile'
// SafeArea.debug()

export default function SignatureComboDemo() {
  const [value, setValue] = useState<string | null>(
    'https://lyrixi.github.io/lyrixi/assets/images/logo.png'
  )

  useEffect(() => {
    Bridge.load({})
  }, [])

  return (
    <Page>
      <Page.Header className="lyrixi-text-center">手写签名</Page.Header>
      <Page.Main className="lyrixi-bg-white">
        <Signature.Combo
          // color="#000000"
          // backgroundColor="white"
          // disabled={true}
          value={value ?? undefined}
          onChange={(newVal) => {
            console.log(newVal)
            setValue(newVal)
          }}
        />
      </Page.Main>
    </Page>
  )
}

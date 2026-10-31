import React from 'react'
import { Clipboard, Page, Button, Toast } from 'lyrixi-mobile'

const COPY_TEXT = 'https://lyrixi.github.io/lyrixi'

export default function ClipboardDemo() {
  function handleCopyWithCallback() {
    Clipboard.setString(COPY_TEXT, {
      onSuccess: () => {
        Toast.open({ content: 'Copy to clipboard success!' })
      },
      onError: () => {
        Toast.open({ content: 'Copy to clipboard failed!' })
      }
    })
  }

  function handleCopyDefault() {
    Clipboard.setString(COPY_TEXT)
  }

  return (
    <Page>
      <Page.Main>
        <Button
          color="primary"
          radius="m"
          block
          onClick={handleCopyWithCallback}
          style={{ margin: 12 }}
        >
          Copy with callback
        </Button>
        <Button color="info" block radius="m" onClick={handleCopyDefault} style={{ margin: 12 }}>
          Copy default
        </Button>
      </Page.Main>
    </Page>
  )
}

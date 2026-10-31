import React, { useState } from 'react'
import { Page, Loading, Button, Toast } from 'lyrixi-mobile'

export default function LoadingApiDemo() {
  const [exists, setExists] = useState(false)

  const refreshExists = () => {
    setExists(Loading.exists())
  }

  const closeAfter1s = () => {
    setTimeout(() => {
      Loading.close()
      refreshExists()
    }, 1000)
  }

  const handleOpenDefault = () => {
    Loading.open()
    refreshExists()
    closeAfter1s()
  }

  const handleOpenContent = () => {
    Loading.open({
      content: 'Loading...'
    })
    refreshExists()
    closeAfter1s()
  }

  const handleOpenCustomStyle = () => {
    Loading.open({
      content: 'Custom style',
      modalClassName: 'demo-loading-custom',
      modalStyle: { backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff', borderRadius: '8px' },
      maskClassName: 'demo-loading-mask',
      maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.6)' }
    })
    refreshExists()
    closeAfter1s()
  }

  const handleClose = () => {
    Loading.close()
    refreshExists()
  }

  const handleOpenLongThenClose = () => {
    Loading.open({ content: 'Will close in 1s' })
    refreshExists()
    closeAfter1s()
  }

  const handleOpenReplace = () => {
    Loading.open({ content: 'First Loading' })
    refreshExists()
    setTimeout(() => {
      Loading.open({ content: 'Updated Loading' })
      refreshExists()
      closeAfter1s()
    }, 2000)
  }

  const handleOpenForExists = () => {
    Loading.open({ content: 'Loading...' })
    refreshExists()
    setTimeout(() => {
      Loading.close()
      refreshExists()
    }, 5000)
  }

  const handleCheckExists = () => {
    const result = Loading.exists()
    setExists(result)
    Toast.open({
      content: result ? 'Loading exists' : 'Loading not exists',
      duration: 1000
    })
  }

  return (
    <Page>
      <Page.Main>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button className="lyrixi-flex" color="primary" onClick={handleOpenDefault}>
            Open Default Loading
          </Button>

          <Button className="lyrixi-flex" color="info" onClick={handleOpenContent}>
            Open Loading (content)
          </Button>

          <Button className="lyrixi-flex" color="info" onClick={handleOpenCustomStyle}>
            Open Loading (custom style)
          </Button>

          <Button className="lyrixi-flex" color="danger" onClick={handleClose}>
            Close Current Loading
          </Button>

          <Button className="lyrixi-flex" color="warning" onClick={handleOpenLongThenClose}>
            Open Loading, Close in 1s
          </Button>

          <Button className="lyrixi-flex" color="primary" onClick={handleOpenReplace}>
            Open Loading (update after 2s)
          </Button>

          <div style={{ marginTop: '10px', marginBottom: '4px' }}>
            Loading.exists(): {exists ? 'true' : 'false'}
          </div>

          <Button className="lyrixi-flex" color="info" onClick={handleOpenForExists}>
            Open Loading (for exists demo, close in 5s)
          </Button>

          <Button className="lyrixi-flex" color="default" onClick={handleCheckExists}>
            Check Loading.exists()
          </Button>
        </div>
      </Page.Main>
    </Page>
  )
}

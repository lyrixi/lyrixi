import React from 'react'
import { Page, Toast, Button } from 'lyrixi-mobile'

export default function ToastApiDemo() {
  const handleOpenDefault = () => {
    Toast.open({
      content: 'Default Toast'
    })
  }

  const handleOpenDuration = () => {
    Toast.open({
      content: 'Auto close in 5s',
      duration: 5000
    })
  }

  const handleOpenTop = () => {
    Toast.open({
      content: 'Top placement',
      placement: 'top'
    })
  }

  const handleOpenMiddle = () => {
    Toast.open({
      content: 'Middle placement',
      placement: 'middle'
    })
  }

  const handleOpenBottom = () => {
    Toast.open({
      content: 'Bottom placement',
      placement: 'bottom'
    })
  }

  const handleOpenMaskClickable = () => {
    Toast.open({
      content: 'Mask not clickable',
      maskClickable: false,
      duration: 5000
    })
  }

  const handleOpenCustomStyle = () => {
    Toast.open({
      content: 'Custom style',
      modalClassName: 'demo-toast-custom',
      modalStyle: { backgroundColor: '#333', color: '#fff' },
      maskClassName: 'demo-toast-mask',
      maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
      duration: 3000
    })
  }

  const handleOpenCallbacks = () => {
    Toast.open({
      content: 'Check console for callbacks',
      duration: 3000,
      onClose: () => {
        console.log('Toast closed')
      }
    })
  }

  const handleClose = () => {
    Toast.close({
      onClose: () => {
        console.log('Toast closed manually')
      }
    })
  }

  const handleOpenLongThenClose = () => {
    Toast.open({
      content: 'Will close in 1s',
      duration: 100000
    })
    setTimeout(() => {
      Toast.close()
    }, 1000)
  }

  const handleOpenReplace = () => {
    Toast.open({
      content: 'First Toast, replaced in 2s',
      duration: 100000
    })

    setTimeout(() => {
      Toast.open({
        content: 'Second Toast',
        duration: 2000
      })
    }, 2000)
  }

  return (
    <Page>
      <Page.Main>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button className="lyrixi-flex" color="primary" onClick={handleOpenDefault}>
            Open Default Toast
          </Button>

          <Button className="lyrixi-flex" color="info" onClick={handleOpenDuration}>
            Open Toast (duration: 5000)
          </Button>

          <Button className="lyrixi-flex" color="default" onClick={handleOpenTop}>
            Open Toast (placement: top)
          </Button>

          <Button className="lyrixi-flex" color="default" onClick={handleOpenMiddle}>
            Open Toast (placement: middle)
          </Button>

          <Button className="lyrixi-flex" color="default" onClick={handleOpenBottom}>
            Open Toast (placement: bottom)
          </Button>

          <Button className="lyrixi-flex" color="warning" onClick={handleOpenMaskClickable}>
            Open Toast (maskClickable: false)
          </Button>

          <Button className="lyrixi-flex" color="info" onClick={handleOpenCustomStyle}>
            Open Toast (custom style)
          </Button>

          <Button className="lyrixi-flex" color="default" onClick={handleOpenCallbacks}>
            Open Toast (onClose)
          </Button>

          <Button className="lyrixi-flex" color="danger" onClick={handleClose}>
            Close Current Toast
          </Button>

          <Button className="lyrixi-flex" color="warning" onClick={handleOpenLongThenClose}>
            Open Long Toast, Close in 1s
          </Button>

          <Button className="lyrixi-flex" color="primary" onClick={handleOpenReplace}>
            Open Toast (replace after 2s)
          </Button>
        </div>
      </Page.Main>
    </Page>
  )
}

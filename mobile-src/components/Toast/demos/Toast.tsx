import React, { useState } from 'react'
import { Page, Toast, Button, type ToastProps } from 'lyrixi-mobile'

const defaultToastProps: ToastProps = {
  content: 'Default Toast'
}

export default function ToastDemo() {
  const [visible, setVisible] = useState(false)
  const [toastProps, setToastProps] = useState<ToastProps>(defaultToastProps)

  const updateToast = (props: ToastProps) => {
    setToastProps(props)
    setVisible(true)
  }

  const handleToast = () => {
    setVisible(false)
  }

  const handleOpenDefault = () => {
    updateToast({
      content: 'Default Toast'
    })
  }

  const handleOpenTop = () => {
    updateToast({
      content: 'Top placement',
      placement: 'top'
    })
  }

  const handleOpenMiddle = () => {
    updateToast({
      content: 'Middle placement',
      placement: 'middle'
    })
  }

  const handleOpenBottom = () => {
    updateToast({
      content: 'Bottom placement',
      placement: 'bottom'
    })
  }

  const handleOpenMaskClickable = () => {
    updateToast({
      content: 'Mask not clickable',
      maskClickable: false
    })

    setTimeout(() => {
      setVisible(false)
    }, 3000)
  }

  const handleOpenCustomStyle = () => {
    updateToast({
      content: 'Custom style',
      modalClassName: 'demo-toast-custom',
      modalStyle: { backgroundColor: '#333', color: '#fff' },
      maskClassName: 'demo-toast-mask',
      maskStyle: { backgroundColor: 'rgba(0, 0, 0, 0.6)' }
    })
  }

  const handleOpenReplace = () => {
    updateToast({
      maskClickable: false,
      content: 'First Toast, replaced in 2s'
    })

    window.setTimeout(() => {
      updateToast({
        content: 'Second Toast'
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

          <Button className="lyrixi-flex" color="danger" onClick={handleToast}>
            Close Current Toast
          </Button>

          <Button className="lyrixi-flex" color="primary" onClick={handleOpenReplace}>
            Open Toast (replace after 2s)
          </Button>
        </div>

        {visible && (
          <Toast {...toastProps} portal={document.getElementById('root') || document.body} />
        )}
      </Page.Main>
    </Page>
  )
}

import React from 'react'
import { Page, Message, Button, Icons } from 'lyrixi-mobile'

export default function MessageApiDemo() {
  const handleOpenMessage = () => {
    Message.open({
      iconSvg: Icons.Config,
      title: 'Title',
      content: <div>Content</div>,
      buttonsDirection: 'vertical',
      buttons: [
        {
          name: 'Button 1',
          onClick: () => {
            console.log('Button 1 clicked')
            return true
          }
        },
        {
          name: 'Button 2',
          color: 'primary',
          onClick: () => {
            console.log('Button 2 clicked')
            return true
          }
        }
      ]
    })
  }

  const handleOpenHorizontalMessage = () => {
    Message.open({
      iconSvg: Icons.Config,
      title: 'Horizontal Layout',
      content: <div>This message uses horizontal button direction</div>,
      buttonsDirection: 'horizontal',
      buttons: [
        {
          name: 'Cancel',
          onClick: () => {
            console.log('Cancel clicked')
            return true
          }
        },
        {
          name: 'Confirm',
          color: 'primary',
          onClick: () => {
            console.log('Confirm clicked')
            return true
          }
        }
      ]
    })
  }

  const handleOpenSimpleMessage = () => {
    Message.open({
      title: 'Simple Message',
      content: <div>This is a simple message without icon</div>,
      buttons: [
        {
          name: 'OK',
          color: 'primary',
          onClick: () => {
            console.log('OK clicked')
            return true
          }
        }
      ]
    })
  }

  const handleCloseMessage = () => {
    Message.close()
  }

  const handleOpenMultipleMessages = () => {
    Message.open({
      title: 'First Message',
      content: <div>This message will be replaced in 3 seconds</div>,
      buttons: [
        {
          name: 'OK',
          color: 'primary',
          onClick: () => true
        }
      ]
    })

    setTimeout(() => {
      Message.open({
        title: 'Second Message',
        content: <div>This message will close in 3 seconds</div>,
        buttons: [
          {
            name: 'OK',
            color: 'primary',
            onClick: () => true
          }
        ]
      })
    }, 3000)

    setTimeout(() => {
      Message.close()
    }, 6000)
  }

  return (
    <Page>
      <Page.Main>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button className="lyrixi-flex" color="primary" onClick={handleOpenMessage}>
            Open Message (Vertical)
          </Button>

          <Button className="lyrixi-flex" color="info" onClick={handleOpenHorizontalMessage}>
            Open Message (Horizontal)
          </Button>

          <Button className="lyrixi-flex" color="default" onClick={handleOpenSimpleMessage}>
            Open Simple Message
          </Button>

          <Button className="lyrixi-flex" color="danger" onClick={handleCloseMessage}>
            Close Current Message
          </Button>

          <Button className="lyrixi-flex" color="warning" onClick={handleOpenMultipleMessages}>
            Open Multiple Messages (3s replace, 3s close)
          </Button>
        </div>
      </Page.Main>
    </Page>
  )
}

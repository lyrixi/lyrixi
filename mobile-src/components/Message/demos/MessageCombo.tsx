import React from 'react'
import { Page, Message, Button, Icons } from 'lyrixi-mobile'

export default function ComboDemo2() {
  const handleOpenMessage = () => {
    Message.open({
      iconSvg: Icons.Config,
      title: 'Title',
      content: <div>Content</div>,
      buttonsDirection: 'vertical',
      buttons: [
        {
          name: 'Button1',
          onClick: () => {
            console.log('Button1 clicked')
            return true
          }
        },
        {
          name: 'Button2',
          color: 'primary',
          onClick: () => {
            console.log('Button2 clicked')
            return true
          }
        }
      ]
    })
  }

  return (
    <Page>
      <Page.Main>
        <Message.Combo
          style={{ margin: 12 }}
          iconSvg={Icons.Config}
          title="Title"
          content={<div>Content</div>}
          buttonsDirection="vertical"
          buttons={[
            {
              id: 'button1',
              name: 'Button1',
              onClick: () => {
                return true
              }
            },
            {
              id: 'button2',
              name: 'Button2',
              color: 'primary',
              onClick: () => {
                return true
              }
            }
          ]}
        >
          <Button className="lyrixi-flex" color="primary">
            Click to show message (Combo)
          </Button>
        </Message.Combo>

        <Button
          className="lyrixi-flex"
          color="info"
          style={{ margin: 12 }}
          onClick={handleOpenMessage}
        >
          Click to show message (API)
        </Button>
      </Page.Main>
    </Page>
  )
}

import React, { useState } from 'react'
import { Page, Message, Button, Icons } from 'lyrixi-mobile'

export default function MessageModalDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Page>
        <Page.Main>
          <Button className="lyrixi-flex" color="primary" onClick={() => setOpen(true)}>
            Open Message.Modal
          </Button>
        </Page.Main>
      </Page>
      <Message.Modal
        open={open}
        onClose={() => setOpen(false)}
        iconSvg={Icons.Config}
        title="Title"
        content="Content"
        buttonsDirection="vertical"
        buttons={[
          {
            name: 'Button1',
            onClick: () => true
          },
          {
            name: 'Button2',
            color: 'primary',
            onClick: () => true
          }
        ]}
      />
    </>
  )
}

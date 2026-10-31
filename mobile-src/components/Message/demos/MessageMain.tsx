import React from 'react'
import { Page, Message, Icons } from 'lyrixi-mobile'

export default function MessageMainDemo() {
  return (
    <Page>
      <Page.Main>
        <div style={{ height: '100px' }}>
          <Message.Main
            iconSvg={Icons.Config}
            title="Title"
            content="Message.Main renders header, body and footer together."
            buttons={[
              {
                name: 'Close',
                color: 'primary',
                onClick: () => {
                  console.log('close')
                }
              }
            ]}
          />
        </div>
      </Page.Main>
    </Page>
  )
}

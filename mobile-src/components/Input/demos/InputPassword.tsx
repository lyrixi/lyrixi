import React, { useState } from 'react'
import { Page, Card, Input } from 'lyrixi-mobile'

export default function InputPasswordDemo() {
  const [value, setValue] = useState('')
  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Common</Card.Header>
          <Card.Main>
            <Input.Password
              placeholder="Select"
              value={value}
              allowClear
              onChange={(val) => {
                console.log(val)
                setValue(val)
              }}
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

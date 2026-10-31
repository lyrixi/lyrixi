import React, { useState } from 'react'
import { Page, Card, Input } from 'lyrixi-mobile'

export default function InputPasswordStrengthDemo() {
  const [value, setValue] = useState('')

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Common</Card.Header>
          <Card.Main>
            <Input.Password
              placeholder="Please input password"
              value={value}
              allowClear
              onChange={(val) => {
                setValue(val)
              }}
            />
            <Input.PasswordStrength value={value} style={{ marginTop: 8 }} />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

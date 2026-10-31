import React, { useState } from 'react'
import { Page, Card, Input } from 'lyrixi-mobile'

export default function InputRangeDemo() {
  const [value, setValue] = useState(0)
  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Common</Card.Header>
          <Card.Main>
            <Input.Range
              style={{ marginTop: '10px', backgroundColor: '#ddd' }}
              value={value}
              // disabled
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

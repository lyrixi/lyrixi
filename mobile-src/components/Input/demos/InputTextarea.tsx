import React, { useState } from 'react'
import { Page, Card, Input } from 'lyrixi-mobile'

export default function InputTextareaDemo() {
  const [value, setValue] = useState('')
  const [sizeValue, setSizeValue] = useState('')
  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Common</Card.Header>
          <Card.Main>
            <Input.Textarea
              value={value}
              allowClear
              formatter={(newValue: string) => {
                return '$' + newValue
              }}
              style={{ backgroundColor: '#f8f8f8' }}
              onChange={(val) => {
                console.log(val)
                setValue(val)
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>尺寸 size</Card.Header>
          <Card.Main>
            <Input.Textarea
              size="xs"
              placeholder="size xs"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              className="lyrixi-border"
            />
            <Input.Textarea
              size="s"
              placeholder="size s"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.Textarea
              size="m"
              placeholder="size m"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.Textarea
              size="l"
              placeholder="size l"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.Textarea
              size="xl"
              placeholder="size xl"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

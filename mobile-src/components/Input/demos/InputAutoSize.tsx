import React, { useState } from 'react'
import { Page, Card, Input } from 'lyrixi-mobile'

export default function InputAutoSizeDemo() {
  const [value, setValue] = useState('')
  const [sizeValue, setSizeValue] = useState('')
  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Common</Card.Header>
          <Card.Main>
            <Input.AutoSize
              placeholder="AutoSize"
              style={{ maxHeight: '100px', backgroundColor: '#f8f8f8' }}
              value={value}
              onChange={setValue}
              allowClear={true}
              onBlur={() => {
                console.log('触发blur')
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Scroll</Card.Header>
          <Card.Main>
            <Input.AutoSize
              placeholder="Scroll"
              style={{ maxHeight: 40, backgroundColor: '#f8f8f8' }}
              value={
                '中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国'
              }
              readOnly={true}
            />

            <Input.AutoSize
              placeholder="Scroll"
              style={{ maxHeight: 40, backgroundColor: '#f8f8f8' }}
              value={
                '中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国中华人民共和国'
              }
              readOnly={true}
              formatter={(newValue: string) => {
                if (newValue) {
                  return '$' + newValue
                }
                return ''
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Formatter</Card.Header>
          <Card.Main>
            <Input.AutoSize
              placeholder="AutoSize"
              formatter={(newValue: string) => {
                if (newValue) {
                  return '$：' + newValue
                }
                return ''
              }}
              style={{ backgroundColor: '#f8f8f8' }}
              value={value}
              onChange={setValue}
              allowClear={true}
              onBlur={() => {
                console.log('触发blur')
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>尺寸 size</Card.Header>
          <Card.Main>
            <Input.AutoSize
              size="xs"
              placeholder="size xs"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              className="lyrixi-border"
            />
            <Input.AutoSize
              size="s"
              placeholder="size s"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.AutoSize
              size="m"
              placeholder="size m"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.AutoSize
              size="l"
              placeholder="size l"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.AutoSize
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

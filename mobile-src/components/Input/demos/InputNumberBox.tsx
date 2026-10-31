import React, { useState } from 'react'
import { Page, MathUtil, Card, Input } from 'lyrixi-mobile'

export default function InputNumberBoxDemo() {
  const [value, setValue] = useState('2.10')
  const [stepValue, setStepValue] = useState('1.0')
  const [minMaxValue, setMinMaxValue] = useState('5')
  return (
    <Page>
      <Page.Main>
        <Card className="lyrixi-padding-horizontal-l lyrixi-padding-vertical-l">
          <Card.Header>Size</Card.Header>
          <Card.Main>
            <Input.NumberBox
              size="xs"
              placeholder="Size xs"
              value={value}
              onChange={setValue}
              precision={2}
              maxLength={8}
              min={0.1}
              trim={true}
              allowClear
            />
            <br />
            <Input.NumberBox
              size="s"
              placeholder="Size s"
              value={value}
              onChange={setValue}
              precision={2}
              maxLength={8}
              min={0.1}
              trim={true}
              allowClear
              style={{ marginTop: '12px' }}
            />
            <br />
            <Input.NumberBox
              size="m"
              placeholder="Size m"
              value={value}
              onChange={setValue}
              precision={2}
              maxLength={8}
              min={0.1}
              trim={true}
              allowClear
              style={{ marginTop: '12px' }}
              formatter={(num: string) => {
                return '$' + MathUtil.thousands(Number(num).toFixed(2))
              }}
            />
            <br />
            <Input.NumberBox
              size="l"
              placeholder="Size l"
              value={value}
              onChange={setValue}
              precision={2}
              maxLength={8}
              min={0.1}
              trim={true}
              allowClear
              style={{ marginTop: '12px' }}
            />
            <br />
            <Input.NumberBox
              size="xl"
              placeholder="Size xl"
              value={value}
              onChange={setValue}
              precision={2}
              maxLength={8}
              min={0.1}
              trim={true}
              allowClear
              style={{ marginTop: '12px' }}
            />
          </Card.Main>
        </Card>

        <Card className="lyrixi-padding-horizontal-l lyrixi-padding-vertical-l">
          <Card.Header>Min / Max</Card.Header>
          <Card.Main>
            <Input.NumberBox
              placeholder="min 1, max 10"
              value={minMaxValue}
              onChange={setMinMaxValue}
              min={1}
              max={10}
              trim={true}
              allowClear
            />
          </Card.Main>
        </Card>

        <Card className="lyrixi-padding-horizontal-l lyrixi-padding-vertical-l">
          <Card.Header>Step</Card.Header>
          <Card.Main>
            <Input.NumberBox
              placeholder="step 0.1"
              value={stepValue}
              onChange={setStepValue}
              step={0.1}
              precision={1}
              min={0}
              trim={true}
              allowClear
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

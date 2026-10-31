import React, { useEffect, useState, useRef } from 'react'
import { Page, MathUtil, Card, Input } from 'lyrixi-mobile'
// import VConsole from 'vconsole'

// const vConsole = new VConsole()

export default function InputNumberDemo() {
  const inputNumberRef = useRef(null)
  const [negativeValue, setNegativeValue] = useState('1a')
  const [decimalValue, setDecimalValue] = useState('')
  const [integerValue, setIntegerValue] = useState('')
  const [formatterValue, setFormatterValue] = useState('')

  useEffect(() => {
    console.log(inputNumberRef.current)
  }, [])
  return (
    <Page>
      <Page.Main>
        {/* 未设 min：系统键盘可带「-」；min>=0 时自动用 decimal/numeric，通常不展示「-」 */}
        <Card>
          <Card.Header>可输入负数（未设 min）</Card.Header>
          <Card.Main>
            <Input.Number
              ref={inputNumberRef}
              placeholder="可输入负数（未设 min）"
              value={negativeValue}
              maxLength={18}
              trim={true}
              allowClear
              clearRender={({ clearable, onClear }) => {
                return clearable ? <Input.IconClear onClick={onClear} /> : <Input.IconRightArrow />
              }}
              onChange={(val) => {
                console.log('得到的值:', val)
                setNegativeValue(val)
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>非负小数（min=0 → decimal）</Card.Header>
          <Card.Main>
            <Input.Number
              placeholder="非负小数（min=0 → decimal）"
              min={0}
              value={decimalValue}
              onChange={setDecimalValue}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>非负整数（min=0, precision=2 → numeric）</Card.Header>
          <Card.Main>
            <Input.Number
              placeholder="非负整数（min=0, precision=2 → numeric）"
              min={0}
              precision={2}
              value={integerValue}
              onChange={setIntegerValue}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Formatter</Card.Header>
          <Card.Main>
            <Input.Number
              value={formatterValue}
              onChange={setFormatterValue}
              formatter={(currentValue: string) => {
                return '$' + MathUtil.thousands(currentValue)
              }}
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

import React, { useEffect, useState, useRef } from 'react'
import { Page, MathUtil, Input, Card, DatePicker } from 'lyrixi-mobile'

export default function InputNumberKeyboardDemo() {
  const numberKeyboardRef = useRef(null)
  const [negativeValue, setNegativeValue] = useState('1a')
  const [decimalValue, setDecimalValue] = useState('')
  const [integerValue, setIntegerValue] = useState('')
  const [formatterValue, setFormatterValue] = useState('')
  const [negativeIntegerValue, setNegativeIntegerValue] = useState('')
  const [noNegativeNoDecimalValue, setNoNegativeNoDecimalValue] = useState('')

  useEffect(() => {
    console.log('NumberKeyboard ref:', numberKeyboardRef.current)
  }, [])

  return (
    <Page>
      <Page.Main>
        {/* 与 InputNumber 对齐的示例 */}
        <Card>
          <Card.Header>可输入负数（未设 min）</Card.Header>
          <Card.Main>
            <Input.Text />
            <DatePicker.Combo />
            <Input.NumberKeyboard
              ref={numberKeyboardRef}
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

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>非负小数（min=0）</Card.Header>
          <Card.Main>
            <Input.NumberKeyboard
              placeholder="非负小数（min=0）"
              min={0}
              value={decimalValue}
              onChange={setDecimalValue}
            />
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>非负整数（min=0, precision=2）</Card.Header>
          <Card.Main>
            <Input.NumberKeyboard
              placeholder="非负整数（min=0, precision=2）"
              min={0}
              precision={2}
              value={integerValue}
              onChange={setIntegerValue}
            />
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>Formatter</Card.Header>
          <Card.Main>
            <Input.NumberKeyboard
              value={formatterValue}
              onChange={setFormatterValue}
              formatter={(currentValue: string) => {
                return '$' + MathUtil.thousands(currentValue)
              }}
            />
          </Card.Main>
        </Card>

        {/* NumberKeyboard 特有示例 */}
        <Card style={{ marginTop: '20px' }}>
          <Card.Header>负数(无小数)</Card.Header>
          <Card.Main>
            <Input.NumberKeyboard
              placeholder="负数(无小数)"
              value={negativeIntegerValue}
              precision={0}
              onChange={setNegativeIntegerValue}
            />
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>无负数, 无小数</Card.Header>
          <Card.Main>
            <Input.NumberKeyboard
              placeholder="无负数, 无小数"
              value={noNegativeNoDecimalValue}
              precision={0}
              min={0}
              onChange={setNoNegativeNoDecimalValue}
            />
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>禁用状态</Card.Header>
          <Card.Main>
            <Input.NumberKeyboard placeholder="禁用状态" value="123" disabled={true} />
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>只读状态</Card.Header>
          <Card.Main>
            <Input.NumberKeyboard placeholder="只读状态" value="456" readOnly={true} />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

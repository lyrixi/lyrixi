import React, { useState, useRef, type ComponentRef } from 'react'
import { Page, Input, Card, FooterBar } from 'lyrixi-mobile'

export default function InputOTPDemo() {
  const inputRef = useRef<ComponentRef<typeof Input.OTP> | null>(null)
  const [numberValue, setNumberValue] = useState(['1', '2', '3', '4', '5', '6'])
  const [textValue, setTextValue] = useState(['a', 'b', 'c', 'd', 'e', 'f'])

  const handleComplete = (completedValue: string[]) => {
    console.log('OTP输入完成:', completedValue)
  }

  return (
    <Page>
      <Page.Main>
        <Card style={{ marginTop: '20px' }}>
          <Card.Header>数值类型</Card.Header>
          <Card.Main>
            <Input.OTP
              type="number"
              value={numberValue}
              onChange={(val) => {
                console.log('数值类型得到的值:', val)
                setNumberValue(val)
              }}
              onComplete={(val) => console.log('数值类型完成:', val)}
            />
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>4位数字</Card.Header>
          <Card.Main>
            <Input.OTP
              maxLength={4}
              value={numberValue}
              onChange={(val) => {
                console.log('得到的值:', val)
                setNumberValue(val)
              }}
              onComplete={(val) => console.log('4位完成:', val)}
            />
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>8位数字</Card.Header>
          <Card.Main>
            <Input.OTP
              maxLength={8}
              value={numberValue}
              onChange={(val) => {
                console.log('得到的值:', val)
                setNumberValue(val)
              }}
              onComplete={(val) => console.log('8位完成:', val)}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>文本类型</Card.Header>
          <Card.Main>
            <Input.OTP
              ref={inputRef}
              type="text"
              value={textValue}
              onChange={(val) => {
                console.log('得到的值:', val)
                setTextValue(val)
              }}
              onComplete={handleComplete}
            />
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>禁用状态</Card.Header>
          <Card.Main>
            <Input.OTP value={['1', '2', '3', '4', '5', '6']} disabled={true} />
          </Card.Main>
        </Card>

        <Card style={{ marginTop: '20px' }}>
          <Card.Header>只读状态</Card.Header>
          <Card.Main>
            <Input.OTP value={['6', '5', '4', '3', '2', '1']} readOnly={true} />
          </Card.Main>
        </Card>
      </Page.Main>
      <Page.Footer>
        <FooterBar>
          <FooterBar.Button onClick={() => inputRef.current?.focus?.()}>
            聚焦第一个输入框
          </FooterBar.Button>
          <FooterBar.Button onClick={() => inputRef.current?.blur?.()}>
            失焦所有输入框
          </FooterBar.Button>
        </FooterBar>
      </Page.Footer>
    </Page>
  )
}

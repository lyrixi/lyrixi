import React, { useEffect, useRef, useState } from 'react'
import { Page, Card, Input } from 'lyrixi-mobile'

export default function InputUrlDemo() {
  const inputUrlRef = useRef(null)
  const [value, setValue] = useState('www.baidu.com/')
  const [sizeValue, setSizeValue] = useState('lyrixi.com')

  useEffect(() => {
    console.log(inputUrlRef.current)
  }, [])

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Common</Card.Header>
          <Card.Main>
            <Input.Url
              ref={inputUrlRef}
              placeholder="请输入网址"
              value={value}
              allowClear
              onChange={setValue}
              onBlur={() => {
                console.log('触发blur')
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>只读复制</Card.Header>
          <Card.Main>
            <Input.Url
              readOnly
              placeholder="Input"
              value="www.baidu.com/"
              rightIconRender={() => <div>click left area will copy link</div>}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>onPreview</Card.Header>
          <Card.Main>
            <Input.Url
              readOnly
              value="https://lyrixi.com"
              rightIconRender={() => <div>自定义预览后再复制</div>}
              onPreview={(url) => {
                console.log('onPreview:', url)
                return true
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Formatter</Card.Header>
          <Card.Main>
            <Input.Url
              placeholder="Input Url"
              value={value}
              allowClear
              onChange={setValue}
              formatter={(newValue: string) => {
                return /^(https|http)?:\/\//.test(newValue) ? newValue : `https://${newValue}`
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>尺寸 size</Card.Header>
          <Card.Main>
            <Input.Url
              size="xs"
              placeholder="size xs"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              className="lyrixi-border"
            />
            <Input.Url
              size="s"
              placeholder="size s"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.Url
              size="m"
              placeholder="size m"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.Url
              size="l"
              placeholder="size l"
              value={sizeValue}
              allowClear
              onChange={setSizeValue}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.Url
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

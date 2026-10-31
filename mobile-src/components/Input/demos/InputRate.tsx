import React, { useState } from 'react'
import { Page, Card, Input, Icons } from 'lyrixi-mobile'

export default function InputRateDemo() {
  const [value, setValue] = useState(3)
  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Common</Card.Header>
          <Card.Main>
            <Input.Rate
              style={{ margin: '0 12px' }}
              value={value}
              // disabled
              onChange={(val) => {
                console.log(val)
                setValue(val)
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>ReadyOnly</Card.Header>
          <Card.Main>
            <Input.Rate style={{ margin: '0 12px' }} value={value} readOnly />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Disabled</Card.Header>
          <Card.Main>
            <Input.Rate style={{ margin: '0 12px' }} value={value} disabled />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Step</Card.Header>
          <Card.Main>
            <Input.Rate style={{ margin: '0 12px' }} step={0.1} value={value} onChange={setValue} />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Min and Max</Card.Header>
          <Card.Main>
            <Input.Rate
              style={{ margin: '0 12px' }}
              min={1}
              max={8}
              value={value}
              onChange={setValue}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Size S</Card.Header>
          <Card.Main>
            <Input.Rate style={{ margin: '0 12px' }} size="s" value={value} onChange={setValue} />
          </Card.Main>
          <Card.Header>Size M</Card.Header>
          <Card.Main>
            <Input.Rate style={{ margin: '0 12px' }} size="m" value={value} onChange={setValue} />
          </Card.Main>
          <Card.Header>Size L</Card.Header>
          <Card.Main>
            <Input.Rate style={{ margin: '0 12px' }} size="l" value={value} onChange={setValue} />
          </Card.Main>
          <Card.Header>Size XL</Card.Header>
          <Card.Main>
            <Input.Rate style={{ margin: '0 12px' }} size="xl" value={value} onChange={setValue} />
          </Card.Main>
          <Card.Header>Size XXL</Card.Header>
          <Card.Main>
            <Input.Rate style={{ margin: '0 12px' }} size="xxl" value={value} onChange={setValue} />
          </Card.Main>
          <Card.Header>Size XXXL</Card.Header>
          <Card.Main>
            <Input.Rate
              style={{ margin: '0 12px' }}
              size="xxxl"
              value={value}
              onChange={setValue}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Icon</Card.Header>
          <Card.Main>
            <Input.Rate
              style={{ margin: '0 12px' }}
              iconSvg={Icons.CircleQuestion}
              // iconRender={() => <Icon svg={Icons.CircleQuestion} size="s" />}
              value={value}
              onChange={setValue}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>checkedColor</Card.Header>
          <Card.Main>
            {['default', 'primary', 'info', 'warning', 'danger', 'success', '#ff8800'].map(
              (color) => (
                <React.Fragment key={color}>
                  <Card.Header>{color}</Card.Header>
                  <Input.Rate
                    style={{ margin: '0 12px var(--lyrixi-space-l)' }}
                    checkedColor={color}
                    value={value}
                    onChange={setValue}
                  />
                </React.Fragment>
              )
            )}
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

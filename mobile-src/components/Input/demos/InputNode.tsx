import React, { useState } from 'react'
import { Button, Card, Input, Page } from 'lyrixi-mobile'

const inputBoxClassName = 'lyrixi-border-t lyrixi-border-b'

const longText =
  'The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America The United States of America'

const buttonLabels = [
  'Alpha',
  'Bravo',
  'Charlie',
  'Delta',
  'Echo',
  'Foxtrot',
  'Golf',
  'Hotel',
  'India',
  'Juliet',
  'Kilo',
  'Lima',
  'Mike',
  'November',
  'Oscar',
  'Papa',
  'Quebec',
  'Romeo',
  'Sierra',
  'Tango'
]

function renderButtons() {
  return buttonLabels.map((label) => (
    <Button key={label} size="xs">
      {label}
    </Button>
  ))
}

export default function InputNodeDemo() {
  const [value, setValue] = useState('Clearable content')

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Common</Card.Header>
          <Card.Main>
            <Input.Node
              placeholder="Please select"
              className={inputBoxClassName}
              onClick={() => console.log('click Input.Node')}
            >
              {value}
            </Input.Node>
          </Card.Main>
        </Card>

        <Card style={{ marginTop: 20 }}>
          <Card.Header>尺寸 size</Card.Header>
          <Card.Main>
            <Input.Node size="xs" placeholder="size xs" className={inputBoxClassName}>
              size xs
            </Input.Node>
            <Input.Node
              size="s"
              placeholder="size s"
              className={inputBoxClassName}
              style={{ marginTop: 12 }}
            >
              size s
            </Input.Node>
            <Input.Node
              size="m"
              placeholder="size m"
              className={inputBoxClassName}
              style={{ marginTop: 12 }}
            >
              size m
            </Input.Node>
            <Input.Node
              size="l"
              placeholder="size l"
              className={inputBoxClassName}
              style={{ marginTop: 12 }}
            >
              size l
            </Input.Node>
            <Input.Node
              size="xl"
              placeholder="size xl"
              className={inputBoxClassName}
              style={{ marginTop: 12 }}
            >
              size xl
            </Input.Node>

            <Input.Node
              size="xs"
              autoSize
              placeholder="size xs"
              className={inputBoxClassName}
              style={{ marginTop: 12 }}
            >
              size xs autoSize
            </Input.Node>
            <Input.Node
              size="s"
              autoSize
              placeholder="size s"
              className={inputBoxClassName}
              style={{ marginTop: 12 }}
            >
              size s autoSize
            </Input.Node>
            <Input.Node
              size="m"
              autoSize
              placeholder="size m"
              className={inputBoxClassName}
              style={{ marginTop: 12 }}
            >
              size m autoSize
            </Input.Node>
            <Input.Node
              size="l"
              autoSize
              placeholder="size l"
              className={inputBoxClassName}
              style={{ marginTop: 12 }}
            >
              size l autoSize
            </Input.Node>
            <Input.Node
              size="xl"
              autoSize
              placeholder="size xl"
              className={inputBoxClassName}
              style={{ marginTop: 12 }}
            >
              size xl autoSize
            </Input.Node>
          </Card.Main>
        </Card>

        <Card style={{ marginTop: 20 }}>
          <Card.Header>Scroll</Card.Header>
          <Card.Main>
            <Input.Node className={inputBoxClassName} placeholder="Scroll">
              {longText}
            </Input.Node>

            <Input.Node
              autoSize
              className={inputBoxClassName}
              style={{ maxHeight: 40, marginTop: 12 }}
              placeholder="Scroll"
            >
              {longText}
            </Input.Node>

            <Input.Node
              className={inputBoxClassName}
              style={{ marginTop: 12 }}
              placeholder="Scroll buttons"
            >
              {renderButtons()}
            </Input.Node>

            <Input.Node
              autoSize
              className={inputBoxClassName}
              style={{ maxHeight: 40, marginTop: 12 }}
              placeholder="Scroll buttons"
            >
              {renderButtons()}
            </Input.Node>
          </Card.Main>
        </Card>

        <Card style={{ marginTop: 20 }}>
          <Card.Header>Allow Clear</Card.Header>
          <Card.Main>
            <Input.Node
              placeholder="Allow clear"
              allowClear
              className={inputBoxClassName}
              onChange={() => setValue('')}
            >
              {value || null}
            </Input.Node>
          </Card.Main>
        </Card>

        <Card style={{ marginTop: 20 }}>
          <Card.Header>Placeholder / Disabled / ReadOnly</Card.Header>
          <Card.Main>
            <Input.Node placeholder="Placeholder" className={inputBoxClassName} />
            <Input.Node
              disabled
              className={inputBoxClassName}
              style={{ marginTop: 12 }}
              placeholder="Disabled"
            >
              Disabled content
            </Input.Node>
            <Input.Node
              readOnly
              className={inputBoxClassName}
              style={{ marginTop: 12 }}
              placeholder="ReadOnly"
            >
              ReadOnly content
            </Input.Node>
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

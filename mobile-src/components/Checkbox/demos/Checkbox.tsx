import React, { useState } from 'react'
import { Page, Card, Icon, Checkbox, Flex, Icons } from 'lyrixi-mobile'

export default function CheckboxDemo() {
  const [value, setValue] = useState(false)

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Variants</Card.Header>
          <Card.Main>
            <Flex gap={12}>
              <Checkbox variant="solid" checked={value} onChange={setValue}>
                solid
              </Checkbox>
              <Checkbox variant="text" checked={value} onChange={setValue}>
                text
              </Checkbox>
              <Checkbox variant="outlined" checked={value} onChange={setValue}>
                outlined
              </Checkbox>
              <Checkbox variant="filled" checked={value} onChange={setValue}>
                filled
              </Checkbox>
            </Flex>
            <Flex gap={12} style={{ marginTop: '10px' }}>
              <Checkbox disabled variant="solid" checked={value} onChange={setValue}>
                solid
              </Checkbox>
              <Checkbox disabled variant="text" checked={value} onChange={setValue}>
                text
              </Checkbox>
              <Checkbox disabled variant="outlined" checked={value} onChange={setValue}>
                outlined
              </Checkbox>
              <Checkbox disabled variant="filled" checked={value} onChange={setValue}>
                filled
              </Checkbox>
            </Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Custom</Card.Header>
          <Card.Main>
            <Checkbox
              checked={value}
              onChange={setValue}
              iconRender={({ checked }) => {
                if (!checked) return <Icon color="quaternary" svg={Icons.Ok} />
                return <Icon color="primary" svg={Icons.Ok} />
              }}
            >
              Custom
            </Checkbox>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>iconPlacement=right</Card.Header>
          <Card.Main>
            <Checkbox checked={value} onChange={setValue} iconPlacement="right">
              iconPlacement=right
            </Checkbox>
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

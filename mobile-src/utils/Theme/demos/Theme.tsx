import React, { useState } from 'react'
import { Theme, Page, Button, Card, Text } from 'lyrixi-mobile'

export default function ThemeDemo() {
  const [themeName, setThemeName] = useState(() => {
    Theme.setTheme('default')
    return 'default'
  })

  const primary = Theme.getTheme()['lyrixi-color-primary']
  const bgDefault = Theme.getTheme()['lyrixi-bg-default']

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Theme</Card.Header>
          <Card.Main>
            <Text style={{ margin: '10px 12px' }}>
              current: {themeName}
              <br />
              primary: {primary}
              <br />
              bg-default: {bgDefault}
            </Text>
            <Button
              block
              radius="m"
              color="primary"
              style={{ margin: '10px 12px' }}
              onClick={() => {
                Theme.setTheme('default')
                setThemeName('default')
              }}
            >
              setTheme default
            </Button>
            <Button
              block
              radius="m"
              style={{ margin: '10px 12px' }}
              onClick={() => {
                Theme.setTheme('dark')
                setThemeName('dark')
              }}
            >
              setTheme dark
            </Button>
            <Button
              block
              radius="m"
              style={{ margin: '10px 12px' }}
              onClick={() => {
                Theme.config({
                  custom: {
                    'lyrixi-color-primary': '#1677ff',
                    'lyrixi-color-primary-lighten': '#e6f4ff'
                  }
                })
                Theme.setTheme('custom')
                setThemeName('custom')
              }}
            >
              config + setTheme custom
            </Button>

            <Button
              block
              radius="m"
              style={{ margin: '10px 12px' }}
              onClick={() => {
                console.log(Theme.getTheme())
              }}
            >
              getTheme
            </Button>
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

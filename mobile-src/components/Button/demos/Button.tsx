import React from 'react'
import {
  Page,
  Divider,
  Button,
  Icon,
  Icons,
  type ButtonVariant,
  type ButtonColor
} from 'lyrixi-mobile'

const buttonStyle = {
  margin: 'var(--lyrixi-space-m)'
}

const themeColors = [
  'default',
  'secondary',
  'tertiary',
  'quaternary',
  'primary',
  'info',
  'warning',
  'danger',
  'success'
]

const variants = ['solid', 'text', 'outlined', 'filled', 'dashed']

export default function ButtonDemo() {
  return (
    <Page style={{ backgroundColor: 'white' }}>
      <Page.Main>
        <Divider>variant × color</Divider>
        {themeColors.map((color) => (
          <div key={color} style={{ marginTop: 'var(--lyrixi-space-l)' }}>
            <Divider>{color}</Divider>
            {variants.map((variant) => (
              <Button
                key={`${color}-${variant}`}
                variant={variant as ButtonVariant}
                color={color as ButtonColor}
                radius="m"
                style={buttonStyle}
              >
                {variant}
              </Button>
            ))}
            <Button
              variant="solid"
              color={color as ButtonColor}
              radius="m"
              disabled
              style={buttonStyle}
            >
              disabled
            </Button>
          </div>
        ))}

        <br />

        <Divider>square</Divider>
        <div>
          <Button square radius="100%" size="m" variant="solid" color="default" style={buttonStyle}>
            <Icon svg={Icons.Search} />
          </Button>
          <Button square size="l" radius="l" variant="solid" color="default" style={buttonStyle}>
            <Icon svg={Icons.Search} />
          </Button>
        </div>

        <Divider>size</Divider>
        <Button size="xs" radius="xs" variant="solid" color="primary" style={buttonStyle}>
          xs
        </Button>
        <Button size="s" radius="s" variant="solid" color="primary" style={buttonStyle}>
          s
        </Button>
        <Button size="m" radius="m" variant="solid" color="primary" style={buttonStyle}>
          m
        </Button>
        <Button size="l" radius="l" variant="solid" color="primary" style={buttonStyle}>
          l
        </Button>
        <Button size="xl" radius="xl" variant="solid" color="primary" style={buttonStyle}>
          xl
        </Button>
        <Button size="xxl" radius="xxl" variant="solid" color="primary" style={buttonStyle}>
          xxl
        </Button>

        <Divider>block</Divider>
        <Button block variant="solid" color="primary" radius="m">
          block
        </Button>
      </Page.Main>
    </Page>
  )
}

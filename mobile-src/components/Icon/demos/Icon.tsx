import React from 'react'
import { Page, Divider, Icon, Icons } from 'lyrixi-mobile'

const iconStyle = {
  margin: 'var(--lyrixi-space-m)'
}

const iconWithBgStyle = {
  ...iconStyle,
  padding: '6px'
}

const sizeSamples = ['xxxxs', 'xxxs', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']
const colorSamples = ['primary', 'info', 'danger', 'success', 'warning']
const variants = ['solid', 'text', 'outlined', 'filled', 'dashed'] as const

const builtinIconEntries = Object.entries(Icons) as Array<
  [string, (typeof Icons)[keyof typeof Icons]]
>

const builtinIconGridStyle = {
  marginTop: 'var(--lyrixi-space-l)',
  display: 'flex',
  flexWrap: 'wrap' as const
}

const builtinIconItemStyle = {
  display: 'inline-flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  width: '80px',
  margin: 'var(--lyrixi-space-s)'
}

const logoSrc = 'https://lyrixi.github.io/lyrixi/assets/images/logo.png'

export default function IconDemo() {
  return (
    <Page style={{ backgroundColor: 'white' }}>
      <Page.Main>
        <Divider>Icon 基础用法</Divider>
        <div style={{ marginTop: 'var(--lyrixi-space-l)' }}>
          <Icon svg={Icons.Close} size="xxxs" color="primary" style={iconStyle} />
          <Icon svg={Icons.Search} size="xxxs" color="primary" style={iconStyle} />
          <Icon svg={Icons.Ok} size="xxxs" color="success" style={iconStyle} />
          <Icon svg={Icons.Trash} size="xxxs" color="danger" style={iconStyle} />
          <Icon svg={Icons.Config} size="xxxs" color="default" style={iconStyle} />
        </div>

        <Divider>Icon src 图片</Divider>
        <div style={{ marginTop: 'var(--lyrixi-space-l)' }}>
          <Icon src={logoSrc} size="xs" style={iconStyle} />
          <Icon src={logoSrc} size="m" style={iconStyle} />
          <Icon src={logoSrc} size="xl" style={iconStyle} />
        </div>

        <Divider>Icon 不同尺寸</Divider>
        <div style={{ marginTop: 'var(--lyrixi-space-l)' }}>
          {sizeSamples.map((size) => (
            <Icon key={size} svg={Icons.Close} size={size} color="primary" style={iconStyle} />
          ))}
        </div>

        <Divider>Icon variant</Divider>
        <div style={{ marginTop: 'var(--lyrixi-space-l)' }}>
          {variants.map((variant) => (
            <Icon
              key={variant}
              svg={Icons.Ok}
              size="xl"
              variant={variant}
              color="primary"
              radius="m"
              style={iconWithBgStyle}
            />
          ))}
          <Icon
            svg={Icons.Search}
            size="xxl"
            variant="solid"
            color="primary"
            radius="100%"
            style={iconWithBgStyle}
          />
          <Icon
            svg={Icons.Config}
            size="xl"
            variant="solid"
            color="info"
            radius="100%"
            style={iconWithBgStyle}
          />
          <Icon
            svg={Icons.Plus}
            size="xl"
            variant="filled"
            color="success"
            radius="100%"
            style={iconWithBgStyle}
          />
        </div>

        <Divider>Icon 不同颜色</Divider>
        <div style={{ marginTop: 'var(--lyrixi-space-l)' }}>
          {colorSamples.map((color) => (
            <Icon key={color} svg={Icons.Close} size="xxxs" color={color} style={iconStyle} />
          ))}
        </div>

        <Divider>Icon 可点击与禁用</Divider>
        <div style={{ marginTop: 'var(--lyrixi-space-l)' }}>
          <Icon
            svg={Icons.Reload}
            size="xs"
            color="primary"
            style={iconStyle}
            onClick={() => console.log('icon clicked')}
          />
          <Icon svg={Icons.Reload} size="xxxs" color="primary" disabled style={iconStyle} />
        </div>

        <Divider>Icon 内置 Icons</Divider>
        <div style={builtinIconGridStyle}>
          {builtinIconEntries.map(([name, svg]) => (
            <div key={name} style={builtinIconItemStyle}>
              <Icon svg={svg} size="xxxs" color="primary" />
              <span className="lyrixi-font-size-xs lyrixi-color-auxiliary">{name}</span>
            </div>
          ))}
        </div>
      </Page.Main>
    </Page>
  )
}

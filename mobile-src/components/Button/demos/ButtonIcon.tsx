import React from 'react'
import { Page, Divider, Button, Icons } from 'lyrixi-mobile'

const buttonStyle = {
  margin: 'var(--lyrixi-space-m)'
}

export default function ButtonIconDemo() {
  return (
    <Page style={{ backgroundColor: 'white' }}>
      <Page.Main>
        <Divider>Button.Icon 基础用法</Divider>
        <div style={{ marginTop: 'var(--lyrixi-space-l)' }}>
          <Button variant="solid" color="primary" radius="m" style={buttonStyle}>
            <Button.Icon svg={Icons.Ok} />
          </Button>
          <Button variant="outlined" color="primary" radius="m" style={buttonStyle}>
            <Button.Icon svg={Icons.Close} />
          </Button>
          <Button variant="outlined" color={'danger'} radius="m" style={buttonStyle}>
            <Button.Icon svg={Icons.Trash} />
          </Button>
          <Button variant="outlined" color={'success'} radius="m" style={buttonStyle}>
            <Button.Icon svg={Icons.CircleOk} />
          </Button>
        </div>

        <Divider>Button.Icon 不同尺寸</Divider>
        <div style={{ marginTop: 'var(--lyrixi-space-l)' }}>
          <Button size="xs" radius="xs" variant="solid" color="primary" style={buttonStyle}>
            <Button.Icon size="xxxs" svg={Icons.Search}></Button.Icon>
          </Button>
          <Button size="s" radius="s" variant="solid" color="primary" style={buttonStyle}>
            <Button.Icon size="xxxs" svg={Icons.Search}></Button.Icon>
          </Button>
          <Button size="m" radius="m" variant="solid" color="primary" style={buttonStyle}>
            <Button.Icon size="xxxs" svg={Icons.Search}></Button.Icon>
          </Button>
          <Button size="l" radius="l" variant="solid" color="primary" style={buttonStyle}>
            <Button.Icon size="xxxs" svg={Icons.Search}></Button.Icon>
          </Button>
          <Button size="xl" radius="xl" variant="solid" color="primary" style={buttonStyle}>
            <Button.Icon size="xxxs" svg={Icons.Search}></Button.Icon>
          </Button>
        </div>

        <Divider>Button.Icon 圆形按钮</Divider>
        <div style={{ marginTop: 'var(--lyrixi-space-l)' }}>
          <Button
            size="32"
            radius="100%"
            square
            variant="solid"
            color="primary"
            style={buttonStyle}
          >
            <Button.Icon svg={Icons.Ok} />
          </Button>
          <Button
            size="40"
            radius="100%"
            square
            variant="solid"
            color="primary"
            style={buttonStyle}
          >
            <Button.Icon svg={Icons.Search} />
          </Button>
          <Button
            size="48"
            radius="100%"
            square
            variant="solid"
            color="primary"
            style={buttonStyle}
          >
            <Button.Icon svg={Icons.Config} />
          </Button>
          <Button
            size="56"
            radius="100%"
            square
            variant="solid"
            color="primary"
            style={buttonStyle}
          >
            <Button.Icon svg={Icons.Plus} size="xxxs" />
          </Button>
        </div>

        <Divider>Button.Icon 不同颜色</Divider>
        <div style={{ marginTop: 'var(--lyrixi-space-l)' }}>
          <Button variant="solid" color="primary" radius="m" style={buttonStyle}>
            <Button.Icon svg={Icons.StarFill} />
          </Button>
          <Button variant="solid" color="info" radius="m" style={buttonStyle}>
            <Button.Icon svg={Icons.CircleInfo} />
          </Button>
          <Button variant="solid" color={'warning'} radius="m" style={buttonStyle}>
            <Button.Icon svg={Icons.CircleWarning} />
          </Button>
          <Button variant="solid" color={'danger'} radius="m" style={buttonStyle}>
            <Button.Icon svg={Icons.Trash} />
          </Button>
          <Button variant="solid" color={'success'} radius="m" style={buttonStyle}>
            <Button.Icon svg={Icons.CircleOk} />
          </Button>
        </div>

        <Divider>Button.Icon 与 Button.Text 组合</Divider>
        <div style={{ marginTop: 'var(--lyrixi-space-l)' }}>
          <Button variant="solid" color="primary" radius="m" style={buttonStyle}>
            <Button.Icon svg={Icons.Ok} />
            <Button.Text>确认</Button.Text>
          </Button>
          <Button variant="outlined" color="primary" radius="m" style={buttonStyle}>
            <Button.Text>删除</Button.Text>
            <Button.Icon svg={Icons.Close} />
          </Button>
          <Button variant="solid" color="default" radius="m" style={buttonStyle}>
            <Button.Icon svg={Icons.Search} />
            <Button.Text>搜索</Button.Text>
          </Button>
          <Button variant="solid" color="default" radius="m" style={buttonStyle}>
            <Button.Text>更多</Button.Text>
            <Button.Icon svg={Icons.ArrowRight} />
          </Button>
        </div>
      </Page.Main>
    </Page>
  )
}

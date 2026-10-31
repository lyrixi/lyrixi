import React from 'react'
import { Page, Progress, Divider, Card } from 'lyrixi-mobile'

const BasicBarDemo = () => {
  return (
    <Page>
      <Page.Main>
        <Divider>基础用法</Divider>
        <Card style={{ padding: '10px 12px' }}>
          <Progress.Bar percent={75} />
        </Card>

        <Divider>Size</Divider>
        <Card style={{ padding: '10px 12px' }}>
          <Progress.Bar percent={60} style={{ '--lyrixi-progress-track-width': '4px' }} />
          <Progress.Bar
            percent={60}
            style={{ '--lyrixi-progress-track-width': '12px', margin: '12px 0' }}
          />
          <Progress.Bar percent={60} style={{ '--lyrixi-progress-track-width': '20px' }} />
        </Card>

        <Divider>Color</Divider>
        <Card style={{ padding: '10px 12px' }}>
          <Progress.Bar
            percent={80}
            style={{
              '--lyrixi-progress-fill-color': '#722ed1',
              '--lyrixi-progress-bg-color': '#f9f0ff'
            }}
          />
          <Progress.Bar
            percent={45}
            style={{
              '--lyrixi-progress-fill-color': '#fa8c16',
              '--lyrixi-progress-bg-color': '#fff7e6',
              margin: '12px 0'
            }}
          />
          <Progress.Bar percent={100} className="lyrixi-success" style={{ margin: '12px 0' }} />
          <Progress.Bar percent={100} className="lyrixi-danger" />
        </Card>
      </Page.Main>
    </Page>
  )
}

export default BasicBarDemo

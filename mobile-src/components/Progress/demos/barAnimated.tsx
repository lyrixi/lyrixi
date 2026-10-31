import React, { useState } from 'react'
import { Page, Progress, Divider, Card } from 'lyrixi-mobile'

const AnimatedBarDemo = () => {
  const [percent, setPercent] = useState(0)

  const handlePercentChange = (newPercent: number) => {
    setPercent(newPercent)
  }

  return (
    <Page>
      <Page.Main>
        <Divider>Duration</Divider>
        <Card style={{ padding: '10px 12px' }}>
          <Progress.Bar
            percent={percent}
            style={{ '--lyrixi-progress-animation-duration': '0.1s' }}
          />
          <Progress.Bar
            percent={percent}
            style={{ '--lyrixi-progress-animation-duration': '1s', margin: '12px 0' }}
          />
          <Progress.Bar
            percent={percent}
            style={{ '--lyrixi-progress-animation-duration': '2s' }}
          />
        </Card>

        <Divider>Timing</Divider>
        <Card style={{ padding: '10px 12px' }}>
          <Progress.Bar
            percent={percent}
            style={{
              '--lyrixi-progress-animation-duration': '1s',
              '--lyrixi-progress-animation-timing': 'linear'
            }}
          />
          <Progress.Bar
            percent={percent}
            style={{
              '--lyrixi-progress-animation-duration': '1s',
              '--lyrixi-progress-animation-timing': 'ease-out',
              margin: '12px 0'
            }}
          />
          <Progress.Bar
            percent={percent}
            style={{
              '--lyrixi-progress-animation-duration': '1s',
              '--lyrixi-progress-animation-timing': 'ease-in-out'
            }}
          />
        </Card>

        <div>
          Percent:
          <input
            type="range"
            min="0"
            max="100"
            value={percent}
            onChange={(e) => handlePercentChange(Number(e.target.value))}
            style={{ marginLeft: '10px' }}
          />
          {percent}%
        </div>
      </Page.Main>
    </Page>
  )
}

export default AnimatedBarDemo

import React, { useState } from 'react'
import { Page, Card, Flex, Button, Checkbox, Input } from 'lyrixi-mobile'

const buttons = Array.from({ length: 6 }).map((_, index) => (
  <Button key={index}>Button {index + 1}</Button>
))

export default function FlexDemo() {
  const [gap, setGap] = useState(8)
  const [gapMode, setGapMode] = useState<number | 'custom'>(8)

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Gap Config</Card.Header>
          <Card.Main>
            <Checkbox.Group
              multiple={false}
              value={gapMode}
              list={[
                { id: 16, name: 'xxl' },
                { id: 14, name: 'xl' },
                { id: 12, name: 'l' },
                { id: 10, name: 'm' },
                { id: 8, name: 's' },
                { id: 6, name: 'xs' },
                { id: 4, name: 'xxs' },
                { id: 2, name: 'xxxs' },
                { id: 'custom', name: 'Custom' }
              ]}
              onChange={(value) => {
                if (value === null || Array.isArray(value)) return
                const { id } = value
                if (id === 'custom') {
                  setGapMode('custom')
                  return
                }
                const nextGap = typeof id === 'number' ? id : Number(id)
                setGapMode(nextGap)
                setGap(nextGap)
              }}
            />
            <Input.Range
              min={0}
              max={64}
              value={gap}
              disabled={gapMode !== 'custom'}
              onChange={(value) => setGap(value)}
              style={{ width: '50%' }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Horizontal</Card.Header>
          <Card.Main>
            <Flex gap={gap}>{buttons.slice(0, 3)}</Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Vertical</Card.Header>
          <Card.Main>
            <Flex direction="vertical" gap={gap}>
              {buttons.slice(0, 2)}
            </Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Justify: start</Card.Header>
          <Card.Main>
            <Flex gap={gap} justify="start">
              {buttons.slice(0, 3)}
            </Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Justify: center</Card.Header>
          <Card.Main>
            <Flex gap={gap} justify="center">
              {buttons.slice(0, 3)}
            </Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Justify: end</Card.Header>
          <Card.Main>
            <Flex gap={gap} justify="end">
              {buttons.slice(0, 3)}
            </Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Justify: between</Card.Header>
          <Card.Main>
            <Flex gap={gap} justify="between">
              {buttons.slice(0, 3)}
            </Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Justify: around</Card.Header>
          <Card.Main>
            <Flex gap={gap} justify="around">
              {buttons.slice(0, 3)}
            </Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Justify: evenly</Card.Header>
          <Card.Main>
            <Flex gap={gap} justify="evenly">
              {buttons.slice(0, 3)}
            </Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Align: start</Card.Header>
          <Card.Main>
            <Flex gap={gap} align="start" style={{ height: 100 }}>
              {buttons.slice(0, 3)}
            </Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Align: center</Card.Header>
          <Card.Main>
            <Flex gap={gap} align="center" style={{ height: 100 }}>
              {buttons.slice(0, 3)}
            </Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Align: end</Card.Header>
          <Card.Main>
            <Flex gap={gap} align="end" style={{ height: 100 }}>
              {buttons.slice(0, 3)}
            </Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>
            Align 分布: between（竖向主轴示意，固定高度可见两端贴边、中间等分）
          </Card.Header>
          <Card.Main>
            <Flex gap={gap} direction="vertical" justify="between" style={{ height: 140 }}>
              {buttons.slice(0, 2)}
            </Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>
            Align 分布: around（竖向主轴示意，固定高度可见两侧留白、中间等分）
          </Card.Header>
          <Card.Main>
            <Flex gap={gap} direction="vertical" justify="around" style={{ height: 140 }}>
              {buttons.slice(0, 2)}
            </Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Align 分布: evenly（竖向主轴示意，固定高度可见均匀分布）</Card.Header>
          <Card.Main>
            <Flex gap={gap} direction="vertical" justify="evenly" style={{ height: 140 }}>
              {buttons.slice(0, 2)}
            </Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Wrap: true</Card.Header>
          <Card.Main>
            <Flex gap={gap} wrap>
              {buttons}
            </Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Wrap: scroll</Card.Header>
          <Card.Main>
            <Flex gap={gap} wrap="scroll">
              {buttons}
            </Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Wrap: no scroll</Card.Header>
          <Card.Main>
            <Flex gap={gap}>{buttons}</Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Flex: 1 / 2 / none(Horizontal)</Card.Header>
          <Card.Main>
            <Flex gap={gap}>
              <Flex
                flex={1}
                style={{ padding: 8, background: 'var(--lyrixi-color-primary-lighten)' }}
              >
                <Button>flex 1</Button>
              </Flex>
              <Flex flex={2} style={{ padding: 8, background: 'var(--lyrixi-color-info-lighten)' }}>
                <Button>flex 2</Button>
              </Flex>
              <Flex
                flex="none"
                style={{ padding: 8, background: 'var(--lyrixi-color-warning-lighten)' }}
              >
                <Button>flex none</Button>
              </Flex>
            </Flex>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Flex: 1 / 2 / none(Vertical)</Card.Header>
          <Card.Main>
            <Flex gap={gap} direction="vertical" style={{ height: 240 }}>
              <Flex
                flex={1}
                style={{ padding: 8, background: 'var(--lyrixi-color-primary-lighten)' }}
              >
                <Button>flex 1</Button>
              </Flex>
              <Flex flex={2} style={{ padding: 8, background: 'var(--lyrixi-color-info-lighten)' }}>
                <Button>flex 2</Button>
              </Flex>
              <Flex
                flex="none"
                style={{ padding: 8, background: 'var(--lyrixi-color-warning-lighten)' }}
              >
                <Button>flex none</Button>
              </Flex>
            </Flex>
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

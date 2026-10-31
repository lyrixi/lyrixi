import React, { useRef, useState } from 'react'
import { Page, Input, Card, type ListItem } from 'lyrixi-mobile'

const longText =
  'super long text name, test the wrap line feature, please scroll to see the full text, super long text name, test the wrap line feature, please scroll to see the full text, super long text name, test the wrap line feature, please scroll to see the full text, super long text name, test the wrap line feature, please scroll to see the full text'

function asSelectItem(value: unknown): ListItem | null {
  if (Array.isArray(value)) {
    const first = value[0]
    return first && typeof first === 'object' && !(first instanceof Date)
      ? (first as ListItem)
      : null
  }
  if (value && typeof value === 'object' && !(value instanceof Date)) {
    return value as ListItem
  }
  return null
}

function asSelectItems(value: unknown): ListItem[] {
  return Array.isArray(value) ? (value as ListItem[]) : []
}

export default function InputSelectDemo() {
  const selectRef = useRef(null)

  const [singleValue, setSingleValue] = useState<ListItem | null>({
    id: '1',
    name: 'Option1',
    allowClear: true
  })

  const [multipleValue, setMultipleValue] = useState<ListItem[]>([
    {
      id: '1',
      name: 'Option1',
      // disabled: true,
      allowClear: true
    },
    {
      id: '2',
      name: 'Option2',
      allowClear: true
    },
    {
      id: '3',
      name: 'Option3',
      allowClear: true
    },
    {
      id: '4',
      name: 'Option4',
      allowClear: true
    },
    {
      id: '5',
      name: 'Option5',
      allowClear: true
    },
    {
      id: '6',
      name: 'Option6',
      allowClear: true
    },
    {
      id: '7',
      name: 'Option7',
      allowClear: true
    },
    {
      id: '8',
      name: 'Option8',
      allowClear: true
    },
    {
      id: '9',
      name: 'Option9',
      allowClear: true
    },
    {
      id: '10',
      name: 'Option10',
      allowClear: true
    },
    {
      id: '11',
      name: 'Option11',
      allowClear: true
    },
    {
      id: '12',
      name: 'Option12',
      allowClear: true
    },
    {
      id: '13',
      name: 'Option13',
      allowClear: true
    },
    {
      id: '14',
      name: 'Option14',
      allowClear: true
    },
    {
      id: '15',
      name: 'Option15',
      allowClear: true
    }
  ])

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Common</Card.Header>
          <Card.Main>
            <Input.Select
              ref={selectRef}
              allowClear
              placeholder="Please select"
              value={singleValue}
              onChange={(v) => setSingleValue(asSelectItem(v))}
              onClick={() => console.log('click')}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>尺寸 size</Card.Header>
          <Card.Main>
            <Input.Select
              mode="tags"
              size="xs"
              allowClear
              placeholder="size xs"
              value={multipleValue}
              onChange={(v) => setMultipleValue(asSelectItems(v))}
              className="lyrixi-border"
            />
            <Input.Select
              mode="tags"
              size="s"
              allowClear
              placeholder="size s"
              value={multipleValue}
              onChange={(v) => setMultipleValue(asSelectItems(v))}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.Select
              mode="tags"
              size="m"
              allowClear
              placeholder="size m"
              value={multipleValue}
              onChange={(v) => setMultipleValue(asSelectItems(v))}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.Select
              mode="tags"
              size="l"
              allowClear
              placeholder="size l"
              value={multipleValue}
              onChange={(v) => setMultipleValue(asSelectItems(v))}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.Select
              mode="tags"
              size="xl"
              allowClear
              placeholder="size xl"
              value={multipleValue}
              onChange={(v) => setMultipleValue(asSelectItems(v))}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />

            <Input.Select
              size="xs"
              allowClear
              placeholder="size xs"
              value={singleValue}
              onChange={(v) => setSingleValue(asSelectItem(v))}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.Select
              size="s"
              allowClear
              placeholder="size s"
              value={singleValue}
              onChange={(v) => setSingleValue(asSelectItem(v))}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.Select
              size="m"
              allowClear
              placeholder="size m"
              value={singleValue}
              onChange={(v) => setSingleValue(asSelectItem(v))}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.Select
              size="l"
              allowClear
              placeholder="size l"
              value={singleValue}
              onChange={(v) => setSingleValue(asSelectItem(v))}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
            <Input.Select
              size="xl"
              allowClear
              placeholder="size xl"
              value={singleValue}
              onChange={(v) => setSingleValue(asSelectItem(v))}
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Scroll</Card.Header>
          <Card.Main>
            <Input.Select
              value={{
                id: 'nowrap-text',
                name: 'super long text name, test the nowrap line feature, please scroll to see the full text'
              }}
              allowClear
              placeholder="nowrap scroll"
              className="lyrixi-border"
            />
            <Input.Select
              autoSize
              allowClear
              value={{
                id: 'wrap-text',
                name: longText
              }}
              placeholder="wrap scroll"
              style={{ marginTop: '12px', maxHeight: '44px' }}
              className="lyrixi-border"
            />
            <Input.Select
              mode="tags"
              autoSize
              allowClear
              placeholder="autoSize vertical scroll"
              style={{ maxHeight: '44px', marginTop: '12px' }}
              className="lyrixi-border"
              value={multipleValue}
              onChange={(v) => setMultipleValue(asSelectItems(v))}
            />
            <Input.Select
              mode="tags"
              allowClear
              placeholder="horizontal scroll"
              style={{ marginTop: '12px' }}
              className="lyrixi-border"
              value={multipleValue}
              onChange={(v) => setMultipleValue(asSelectItems(v))}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Multiple</Card.Header>
          <Card.Main>
            <Input.Select
              allowClear
              placeholder="Multiple select"
              value={multipleValue}
              onChange={(v) => setMultipleValue(asSelectItems(v))}
              onClick={() => console.log('click multiple')}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Multiple separator</Card.Header>
          <Card.Main>
            <Input.Select
              allowClear
              separator="|"
              placeholder="Multiple select"
              value={multipleValue}
              onChange={(v) => setMultipleValue(asSelectItems(v))}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>mode tags</Card.Header>
          <Card.Main>
            <Input.Select
              mode="tags"
              allowClear
              placeholder="Tags mode"
              value={singleValue ? [singleValue] : []}
              onChange={(v) => setSingleValue(asSelectItem(v))}
              onClick={() => console.log('click tags')}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>mode tags Multiple</Card.Header>
          <Card.Main>
            <Input.Select
              mode="tags"
              allowClear
              placeholder="Multiple tags"
              value={multipleValue}
              onChange={(v) => setMultipleValue(asSelectItems(v))}
              onClick={() => console.log('click multiple tags')}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>mode tags Multiple separator</Card.Header>
          <Card.Main>
            <Input.Select
              mode="tags"
              separator=","
              allowClear
              placeholder="Multiple tags"
              value={multipleValue}
              onChange={(v) => setMultipleValue(asSelectItems(v))}
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

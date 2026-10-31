import React, { useMemo, useState, type CSSProperties } from 'react'
import { Page, Select, Card, ToolBar, Text, FunctionUtil, type SelectItem } from 'lyrixi-mobile'
import flatList from './flatList'
import groupList from './groupList'

const SelectCombo = () => {
  const [keyword, setKeyword] = useState('')
  const [singleValue, setSingleValue] = useState<SelectItem | null>(null)

  const debouncedSetKeyword = useMemo(
    () => FunctionUtil.debounce((newKeyword: string) => setKeyword(newKeyword), 1000),
    []
  )

  const [multipleValue, setMultipleValue] = useState<SelectItem[]>([
    {
      allowClear: true,
      id: '1',
      name: 'Option'
    },
    {
      id: '2',
      name: 'Option2',
      style: {
        color: 'red',
        padding: 0,
        backgroundColor: 'transparent'
      }
    },
    {
      id: '3',
      name: 'Option3',
      disabled: true,
      allowClear: true
    }
  ])
  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Single Select</Card.Header>
          <Card.Main>
            <Select.Combo
              title="Select"
              portal={document.body}
              placeholder="Single Select"
              allowClear
              list={flatList}
              value={singleValue}
              onChange={(v) => {
                console.log('onChange:', v)
                setSingleValue(Array.isArray(v) ? v[0] ?? null : v)
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Multiple Select</Card.Header>
          <Card.Main>
            <Select.Combo
              title="Select"
              placeholder="Multiple Select"
              multiple
              allowClear
              list={flatList}
              value={multipleValue}
              onChange={(v) => {
                console.log('onChange:', v)
                setMultipleValue(Array.isArray(v) ? v : v ? [v] : [])
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Multiple Select separator</Card.Header>
          <Card.Main>
            <Select.Combo
              title="Select"
              placeholder="Multiple Select"
              multiple
              separator="|"
              allowClear
              list={flatList}
              value={multipleValue}
              onChange={(v) => {
                console.log('onChange:', v)
                setMultipleValue(Array.isArray(v) ? v : v ? [v] : [])
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Single tags</Card.Header>
          <Card.Main>
            <Select.Combo
              title="Select"
              placeholder="Single tags Select"
              mode={'tags'}
              // disabled
              allowClear
              list={flatList}
              value={singleValue}
              onChange={(v) => {
                console.log('onChange:', v)
                setSingleValue(Array.isArray(v) ? v[0] ?? null : v)
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Multiple Tags</Card.Header>
          <Card.Main>
            <Select.Combo
              title="Select"
              placeholder="Multiple Select"
              mode={'tags'}
              multiple
              // disabled
              allowClear
              list={flatList}
              value={multipleValue}
              onChange={(v) => {
                console.log('onChange:', v)
                setMultipleValue(Array.isArray(v) ? v : v ? [v] : [])
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Multiple Tags separator</Card.Header>
          <Card.Main>
            <Select.Combo
              title="Select"
              placeholder="Multiple Select"
              mode={'tags'}
              separator=","
              multiple
              // disabled
              allowClear
              list={flatList}
              value={multipleValue}
              onChange={(v) => {
                console.log('onChange:', v)
                setMultipleValue(Array.isArray(v) ? v : v ? [v] : [])
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Custom Checkbox</Card.Header>
          <Card.Main>
            <Select.Combo
              title="Select"
              placeholder="Custom Checkbox"
              allowClear
              list={flatList}
              value={singleValue}
              onChange={(v) => {
                console.log('onChange:', v)
                setSingleValue(Array.isArray(v) ? v[0] ?? null : v)
              }}
              checkable
              checkboxPlacement="left"
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Group</Card.Header>
          <Card.Main>
            <Select.Combo
              placeholder="Group"
              title="Group Select"
              allowClear
              value={singleValue}
              list={groupList}
              onChange={(v) => {
                console.log('onChange:', v)
                setSingleValue(Array.isArray(v) ? v[0] ?? null : v)
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Modal Style: modalStyle & modalClassName</Card.Header>
          <Card.Main>
            <Select.Combo
              title="Select"
              placeholder="Single Select"
              allowClear
              list={flatList}
              value={singleValue}
              onChange={(v) => {
                console.log('onChange:', v)
                setSingleValue(Array.isArray(v) ? v[0] ?? null : v)
              }}
              modalStyle={{ height: '300px' }}
              modalClassName="custom"
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Custom Header: Search</Card.Header>
          <Card.Main>
            <Select.Combo
              placeholder="Search"
              allowClear
              title="Select"
              headerRender={() => {
                return (
                  <ToolBar variant="filled">
                    <ToolBar.Search
                      allowClear
                      value={keyword}
                      // onSearch={(newKeyword) => {
                      //   setKeyword(newKeyword)
                      // }}
                      compositionEndEnabled={true}
                      onChange={(newKeyword) => {
                        debouncedSetKeyword(newKeyword)
                      }}
                    />
                  </ToolBar>
                )
              }}
              value={singleValue}
              // List filter by keyword
              list={flatList?.filter?.((item) => String(item.name ?? '').includes(keyword)) || []}
              // Keyword hightlight
              formatViewItem={(item) => {
                return {
                  title: (
                    <Text style={item.style as CSSProperties} highlight={keyword}>
                      {String(item.name ?? '')}
                    </Text>
                  )
                }
              }}
              onChange={(newValue) => {
                console.log('onChange:', newValue)
                setSingleValue(Array.isArray(newValue) ? newValue[0] ?? null : newValue)
              }}
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

export default SelectCombo

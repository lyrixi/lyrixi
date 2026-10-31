import React, { useState, type ReactNode } from 'react'
import { Page, List, Card, Button } from 'lyrixi-mobile'
import type { ListItem, ListViewItem } from 'lyrixi-mobile'
import listAllData from './listAllData'
import listData from './listData'

const ListDemo = () => {
  const [singleValue, setSingleValue] = useState<ListItem | ListItem[] | null>(null)
  const [multipleValue, setMultipleValue] = useState<ListItem[]>([])

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>List 基础（全样式展示）</Card.Header>
          <Card.Header>itemLayout horizontal</Card.Header>
          <Card.Main>
            <List
              list={listAllData}
              formatViewItem={(item: ListItem): ListViewItem => {
                return {
                  ...item,
                  actionRender: () => {
                    return <Button size="s">actionRender</Button>
                  }
                } as ListViewItem
              }}
              value={singleValue}
              onChange={(newSingleValue) => {
                console.log('newSingleValue:', newSingleValue)
                setSingleValue(newSingleValue)
              }}
              checkable
              allowClear
            />
          </Card.Main>
          <Card.Header>itemLayout vertical</Card.Header>
          <Card.Main>
            <List
              list={listAllData}
              itemLayout="vertical"
              formatViewItem={(item: ListItem): ListViewItem => {
                return {
                  ...item,
                  _raw: item,
                  id: item.id,
                  actionRender: () => {
                    return <Button size="s">actionRender</Button>
                  }
                } as ListViewItem
              }}
              value={singleValue}
              onChange={(newSingleValue) => {
                console.log('newSingleValue:', newSingleValue)
                setSingleValue(newSingleValue)
              }}
              checkable
              allowClear
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>List 多选（multiple、allowClear）</Card.Header>
          <Card.Main>
            <List
              list={listData}
              value={multipleValue}
              onChange={(newMultipleValue) => {
                console.log('newMultipleValue:', newMultipleValue)
                if (newMultipleValue === null) {
                  setMultipleValue([])
                } else {
                  setMultipleValue(
                    Array.isArray(newMultipleValue) ? newMultipleValue : [newMultipleValue]
                  )
                }
              }}
              checkable
              multiple
              allowClear
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>
            List 项布局（itemLayout=vertical）、复选框在右（checkboxPlacement=right）
          </Card.Header>
          <Card.Main>
            <List
              list={listData.slice(0, 3)}
              value={singleValue}
              onChange={setSingleValue}
              checkable
              allowClear
              itemLayout="vertical"
              checkboxPlacement="right"
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>List formatViewItem（格式化单项显示）</Card.Header>
          <Card.Main>
            <List
              list={listData.slice(0, 4)}
              value={singleValue}
              onChange={setSingleValue}
              checkable
              allowClear
              formatViewItem={(item: ListItem, { index }): ListViewItem => {
                return {
                  ...item,
                  _raw: item,
                  id: item.id ?? index,
                  title: (
                    <div>
                      <span style={{ color: '#999' }}>{index}: </span>
                      <span>{String((item as { name?: unknown }).name ?? '')}</span>
                    </div>
                  )
                } as ListViewItem
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>List itemRender（自定义项渲染）</Card.Header>
          <Card.Main>
            <List
              list={listData.slice(0, 3)}
              value={singleValue}
              onChange={setSingleValue}
              checkable
              allowClear
              itemRender={(item, { checked, onChange, index }) => (
                <List.Item
                  _raw={item}
                  key={String(
                    (item._raw as { id?: unknown } | undefined)?.id ??
                      (item as { id?: unknown }).id ??
                      index
                  )}
                  checked={checked}
                  checkable
                  onChange={onChange}
                  title={item.name as ReactNode}
                  description={item.description as ReactNode}
                  note={'note'}
                  actionRender={() => <Button size="s">操作</Button>}
                />
              )}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>List type group（扁平分组）</Card.Header>
          <Card.Main>
            <List
              list={[
                { id: 'group-a', type: 'group', name: '分组 A', description: 'Group A' },
                ...listData.map((row) => ({ ...row, id: `a-${row.id}` })),
                { id: 'group-b', type: 'group', name: '分组 B', description: 'Group B' },
                ...listData.map((row) => ({ ...row, id: `b-${row.id}` }))
              ]}
              value={singleValue}
              onChange={(value) => {
                console.log('List group:', value)
                setSingleValue(value)
              }}
              checkable
              allowClear
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

export default ListDemo

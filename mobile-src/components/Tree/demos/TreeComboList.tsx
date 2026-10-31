import React, { useState } from 'react'
import { Page, Tree, Card, type TreeItem } from 'lyrixi-mobile'

import { treeDemoList } from './treeDemoList'

export default function TreeComboListDemo() {
  const [singleValue, setSingleValue] = useState<TreeItem | null>({ id: 'a', name: '员工1' })
  const [multipleValue, setMultipleValue] = useState<TreeItem[]>([
    { id: 'a', name: '员工1' },
    { id: 'b', name: '员工2' }
  ])
  const [valueCheckable, setValueCheckable] = useState<TreeItem[]>([{ id: 'a', name: '员工1' }])
  const [valueNotCheckable, setValueNotCheckable] = useState<TreeItem[]>([
    { id: 'a', name: '员工1' }
  ])
  const [valueLeafCheckable, setValueLeafCheckable] = useState<TreeItem[]>([
    { id: 'a', name: '员工1' }
  ])
  const [searchSubmitValue, setSearchSubmitValue] = useState<TreeItem[]>([])
  const [searchInputValue, setSearchInputValue] = useState<TreeItem[]>([])

  function handleSingleChange(value: TreeItem | TreeItem[] | null) {
    if (Array.isArray(value)) {
      setSingleValue(value[0] ?? null)
      return
    }
    setSingleValue(value)
  }

  function createMultipleChangeHandler(setter: (value: TreeItem[]) => void) {
    return (value: TreeItem | TreeItem[] | null) => {
      if (Array.isArray(value)) {
        setter(value)
        return
      }
      setter(value ? [value] : [])
    }
  }

  const handleMultipleChange = createMultipleChangeHandler(setMultipleValue)

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>单选</Card.Header>
          <Card.Main>
            <Tree.Combo
              title="树选择"
              placeholder="请选择"
              multiple={false}
              allowClear
              searchVisible
              checkable={true}
              list={treeDemoList}
              value={singleValue}
              defaultParentAvatarUrl="default"
              defaultLeafAvatarUrl="default"
              onChange={handleSingleChange}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>多选</Card.Header>
          <Card.Main>
            <Tree.Combo
              title="树选择"
              placeholder="请选择"
              multiple
              allowClear
              searchVisible
              checkable={true}
              list={treeDemoList}
              value={multipleValue}
              defaultParentAvatarUrl="default"
              defaultLeafAvatarUrl="default"
              onChange={handleMultipleChange}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>checkable={'{true}'}</Card.Header>
          <Card.Main>
            <Tree.Combo
              title="树选择"
              placeholder="请选择"
              multiple
              allowClear
              searchVisible
              checkable={true}
              list={treeDemoList}
              value={valueCheckable}
              defaultParentAvatarUrl="default"
              defaultLeafAvatarUrl="default"
              onChange={createMultipleChangeHandler(setValueCheckable)}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>checkable={'{false}'}</Card.Header>
          <Card.Main>
            <Tree.Combo
              title="树选择"
              placeholder="请选择"
              multiple
              allowClear
              searchVisible
              checkable={false}
              list={treeDemoList}
              value={valueNotCheckable}
              defaultParentAvatarUrl="default"
              defaultLeafAvatarUrl="default"
              onChange={createMultipleChangeHandler(setValueNotCheckable)}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>checkable=&apos;leaf&apos;</Card.Header>
          <Card.Main>
            <Tree.Combo
              title="树选择"
              placeholder="请选择"
              multiple
              allowClear
              searchVisible
              checkable="leaf"
              list={treeDemoList}
              value={valueLeafCheckable}
              defaultParentAvatarUrl="default"
              defaultLeafAvatarUrl="default"
              onChange={createMultipleChangeHandler(setValueLeafCheckable)}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>searchAction=&quot;submit&quot;（默认，回车/搜索键触发）</Card.Header>
          <Card.Main>
            <Tree.Combo
              title="树选择"
              placeholder="请选择"
              multiple
              allowClear
              searchVisible
              searchAction="submit"
              checkable
              list={treeDemoList}
              value={searchSubmitValue}
              defaultParentAvatarUrl="default"
              defaultLeafAvatarUrl="default"
              onChange={createMultipleChangeHandler(setSearchSubmitValue)}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>searchAction=&quot;input&quot;（输入防抖 500ms 后自动搜索）</Card.Header>
          <Card.Main>
            <Tree.Combo
              title="树选择"
              placeholder="请选择"
              multiple
              allowClear
              searchVisible
              searchAction="input"
              checkable
              list={treeDemoList}
              value={searchInputValue}
              defaultParentAvatarUrl="default"
              defaultLeafAvatarUrl="default"
              onChange={createMultipleChangeHandler(setSearchInputValue)}
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

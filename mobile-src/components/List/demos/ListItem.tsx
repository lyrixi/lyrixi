import React, { useState } from 'react'
import { Page, List, Card, Button } from 'lyrixi-mobile'

export default function ListItemDemo() {
  const [checkedId, setCheckedId] = useState<string | number | null>(null)

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>List.Item 属性示例</Card.Header>
          <Card.Main>
            <List.Item _raw={{ id: '1' }} title="仅标题" description="描述文字" />
            <List.Item
              _raw={{ id: '2' }}
              avatarUrl="https://api.dicebear.com/7.x/miniavs/svg?seed=2"
              title="avatarUrl 头像"
              description="左侧头像"
            />
            <List.Item _raw={{ id: '3' }} title="note 右侧备注" description="描述" note="备注" />
            <List.Item
              _raw={{ id: '4' }}
              title="content 区块"
              description="描述"
              content="自定义 content 区域内容"
            />
            <List.Item
              _raw={{ id: '5' }}
              title="actionRender 操作区"
              description="右侧可放按钮"
              actionRender={() => <Button size="s">操作</Button>}
            />
            <List.Item
              _raw={{ id: '6' }}
              checkable
              checked={checkedId === '6'}
              onChange={(raw) =>
                setCheckedId(raw.checked ? (raw.id as string | number) ?? null : null)
              }
              title="checkable 可选项"
              description="点击整行单选"
            />
            <List.Item _raw={{ id: '7' }} disabled title="disabled 禁用" description="不可点击" />
            <List.Item
              _raw={{ id: '8' }}
              layout="vertical"
              title="itemLayout=vertical（需由 List 传入 layout）"
              description="单条演示竖向布局"
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

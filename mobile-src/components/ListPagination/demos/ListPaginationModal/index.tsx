// 第三方库导入
import React, { useState } from 'react'
import { Button, Card, ListPagination, Page } from 'lyrixi-mobile'

// 项目内部模块导入
import formatResponse from '../ListPaginationMain/formatResponse'
import formatViewItem from '../ListPaginationMain/formatViewItem'

import type { ListPaginationDemoRow } from './../ListPagination.demos.types'

// ListPagination.Modal：受控弹窗内分页列表选择
export default function ListPaginationModalDemo() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<ListPaginationDemoRow | ListPaginationDemoRow[] | null>(null)

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>ListPagination.Modal</Card.Header>
          <Card.Main>
            <Button onClick={() => setOpen(true)}>打开选择</Button>
            <ListPagination.Modal
              open={open}
              onClose={() => setOpen(false)}
              title="选择一项"
              url="/"
              formatResponse={formatResponse}
              formatViewItem={formatViewItem}
              value={value}
              onChange={(v) => {
                console.log('onChange:', v)
                setValue(v)
                setOpen(false)
              }}
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

// 第三方库导入
import React, { useState } from 'react'
import { ListPagination, Page, Card } from 'lyrixi-mobile'

// 项目内部模块导入
import formatResponse from '../ListPaginationMain/formatResponse'
import formatViewItem from '../ListPaginationMain/formatViewItem'
import Header from './Header'

import type { ListPaginationDemoRow } from './../ListPagination.demos.types'

// ListPagination.Combo：触发器 + 弹窗内分页列表选择（不支持传 list，使用 url + formatResponse/formatViewItem）
const ListPaginationComboDemo = () => {
  const [singleValue, setSingleValue] = useState<ListPaginationDemoRow | null>(null)
  const [multipleValue, setMultipleValue] = useState<ListPaginationDemoRow[]>([])
  const [keyword, setKeyword] = useState('')

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Single Select</Card.Header>
          <Card.Main>
            <ListPagination.Combo
              placeholder="Single Select"
              allowClear
              title="Single Select"
              url="/"
              formatResponse={formatResponse}
              formatViewItem={formatViewItem}
              value={singleValue}
              onChange={(v) => {
                console.log('onChange:', v)
                setSingleValue((v as ListPaginationDemoRow) || null)
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Multiple Select</Card.Header>
          <Card.Main>
            <ListPagination.Combo
              placeholder="Multiple Select"
              allowClear
              multiple
              title="Multiple Select"
              url="/"
              formatResponse={formatResponse}
              formatViewItem={formatViewItem}
              value={multipleValue}
              onChange={(v) => {
                console.log('onChange:', v)
                setMultipleValue(Array.isArray(v) ? (v as ListPaginationDemoRow[]) : [])
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>Custom Header: Search（keyword 入参）</Card.Header>
          <Card.Main>
            <ListPagination.Combo
              placeholder="Search"
              allowClear
              title="Select"
              url="/"
              payload={{ keyword: keyword }}
              formatPayload={({ page, ...payload }) => {
                return {
                  ...payload,
                  page,
                  keyword
                }
              }}
              formatResponse={formatResponse}
              formatViewItem={formatViewItem}
              value={singleValue}
              onChange={(v) => setSingleValue((v as ListPaginationDemoRow) || null)}
              headerRender={() => <Header onSearch={setKeyword} />}
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

export default ListPaginationComboDemo

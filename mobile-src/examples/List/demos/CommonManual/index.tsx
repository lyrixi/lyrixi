import React, { useRef, useState } from 'react'

import { Page, type ListLoadResult, type ListAsyncRef } from 'lyrixi-mobile'

import { queryData, type CommonManualQueryDataResult } from './api'
import Header from './Header'
import Main from './Main'

import './index.less'

// 手动加载列表（ListAsync）
const CommonManual = () => {
  const mainRef = useRef<ListAsyncRef | null>(null)
  const [queryParams, setQueryParams] = useState<Record<string, unknown>>({})

  return (
    <Page>
      {/* 搜索栏 */}
      <Header
        queryParams={queryParams}
        onSearch={(newQueryParams: Record<string, unknown>) => {
          setQueryParams(newQueryParams)
          mainRef.current?.reload?.('reload')
        }}
      />

      {/* 列表 */}
      <Main
        ref={mainRef}
        loadData={async ({ previousResult, action }) => {
          const result = (await queryData(queryParams, {
            action: action
          })) as CommonManualQueryDataResult
          let newList: unknown[] | null = null
          if (result.status !== 'error' && result.data?.list) {
            const prev = (previousResult?.data?.list ?? []) as unknown[]
            newList = action === 'bottomRefresh' ? prev.concat(result.data.list) : result.data.list
          }

          return {
            status: result.status,
            message: result.message,
            data: {
              list: newList ?? undefined
            }
          } as ListLoadResult
        }}
        onChange={() => {}}
      />
    </Page>
  )
}

export default CommonManual

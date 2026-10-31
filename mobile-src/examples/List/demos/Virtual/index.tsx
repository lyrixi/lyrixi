import React, { useRef, useState } from 'react'

import { Page, type ListPaginationMainRef } from 'lyrixi-mobile'

import type { VirtualDemoItemHeightRow } from './types'
import Header from './../Common/Header'
import Main from './../Common/Main'

import './../Common/index.less'

// 虚拟滚动列表
const Virtual = () => {
  const mainRef = useRef<ListPaginationMainRef | null>(null)

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
        cacheName="list-virtual-demo"
        queryParams={queryParams}
        virtual={{
          getItemHeight: (item: Record<string, unknown>) => {
            const row = item as VirtualDemoItemHeightRow
            if (row?.type === 'group' || row?.virtualData?.type === 'group') {
              return 33
            }
            return 71
          }
        }}
      />
    </Page>
  )
}

export default Virtual

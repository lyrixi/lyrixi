import React, { useRef, useState } from 'react'

import {
  IndexBar,
  Page,
  type ListItem,
  type ListAsyncItem,
  type ListPaginationMainRef
} from 'lyrixi-mobile'

import type { IndexBarListLoadContext } from './Main/types'
import Header from './../Common/Header'
import Main from './Main'

import './../Common/index.less'

// IndexBar列表示例
const IndexBarList = () => {
  const mainRef = useRef<ListPaginationMainRef | null>(null)
  const [queryParams, setQueryParams] = useState<Record<string, unknown>>({})

  // IndexBar
  const [indexList, setIndexList] = useState<ListItem[]>([])
  const [anchor, setAnchor] = useState<ListItem | null>(null)

  function handleIndexChange(indexItem: ListItem) {
    setAnchor(indexItem)
    if (indexItem.id === undefined) return
    mainRef.current?.scrollToLocation?.({ id: indexItem.id })
  }

  function handleItemVisibleChange(item: ListAsyncItem) {
    const next = item.type === 'group' ? String(item.id ?? '') : String(item.anchor ?? '')
    if (!next) return
    setAnchor(indexList.find((indexItem) => indexItem.id === next) ?? { id: next, name: next })
  }

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
        cacheName="indexbar-list-demo"
        queryParams={queryParams}
        onLoad={({ result }: IndexBarListLoadContext) => {
          const nextList: ListItem[] = []
          const list = result?.data?.list
          if (Array.isArray(list)) {
            for (let i = 0; i < list.length; i++) {
              const item = list[i]
              if (item?.type === 'group' && item.id != null) {
                const id = String(item.id)
                if (!nextList.some((a) => a.id === id)) {
                  nextList.push({ id, name: String(item.name ?? item.title ?? id) })
                }
              }
            }
          }
          setIndexList(nextList)
        }}
        onItemVisibleChange={handleItemVisibleChange}
      />

      <IndexBar list={indexList} value={anchor} onChange={handleIndexChange} />
    </Page>
  )
}

export default IndexBarList

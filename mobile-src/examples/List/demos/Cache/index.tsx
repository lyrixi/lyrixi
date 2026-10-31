import React, { useEffect, useRef, useState } from 'react'

import { LocaleUtil, Page, Storage, type ListPaginationMainRef } from 'lyrixi-mobile'

import type { ListCacheStoredShape } from './types'
import Footer from './../Common/Footer'
import Header from './../Common/Header'
import Main from './../Common/Main'

import './../Common/index.less'

const locale = LocaleUtil.locale

const cacheName = 'pageName_cache'

// 缓存列表
const Cache = () => {
  const mainRef = useRef<ListPaginationMainRef | null>(null)
  // 前进需要清除缓存
  // const history = useHistory()
  // if (Storage.getItem(cacheName) && history.action !== 'POP') {
  //   Storage.removeItem(cacheName)
  // }

  const [queryParams, setQueryParams] = useState<Record<string, unknown>>({})

  useEffect(() => {
    void Storage.getItem(cacheName).then((cached) => {
      const data = cached as ListCacheStoredShape | null
      if (data?.queryParams) {
        setQueryParams(data.queryParams)
      }
    })
  }, [])

  return (
    <Page>
      {/* 搜索栏 */}
      <Header
        queryParams={queryParams}
        onSearch={(newQueryParams: Record<string, unknown>) => {
          setQueryParams(newQueryParams)
        }}
      />

      {/* 列表 */}
      <Main ref={mainRef} cacheName={cacheName} queryParams={queryParams} />

      {/* 底部 */}
      <Footer
        ok={String(locale('Save cache'))}
        onOk={() => {
          mainRef.current?.updateCache?.({ queryParams })
        }}
        cancel={String(locale('Clear cache'))}
        onCancel={() => {
          void Storage.removeItem(cacheName)
        }}
      />
    </Page>
  )
}

export default Cache

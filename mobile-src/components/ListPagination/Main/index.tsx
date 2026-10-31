// 第三方库导入
import React, { useImperativeHandle, forwardRef, useRef, useEffect } from 'react'

import type { ListPaginationMainProps, ListPaginationMainRef } from './../types'

// 内库使用-start
import Storage from './../../../utils/Storage'
import ListAsync from './../../ListAsync'
import type { ListLoadResult, ListAsyncRef } from './../../ListAsync/types'
import type { ListProps, ListItem } from './../../List/types'
// 内库使用-end

/* 测试使用-start
import { Storage, ListAsync } from 'lyrixi-mobile'
测试使用-end */

import queryData from './queryData'

// 简便的列表组件, 只需要传入url和formatPayload即可
const ListMainPagination = forwardRef<ListPaginationMainRef, ListPaginationMainProps>(
  (
    {
      cacheName,
      // Value & Display Value
      id,
      value,
      url,
      headers,
      payload,
      pagination = { rows: 20 },
      formatPayload,
      formatResponse,
      formatViewItem,

      // Status
      errorRetry,
      emptyRetry,
      multiple,
      allowClear,
      checkable,
      topRefreshEnabled,
      bottomRefreshEnabled,
      virtual,

      // Style
      style,
      className,
      itemStyle,
      itemClassName,
      itemLayout,
      checkboxVariant,
      checkboxPlacement,
      loadingModalStyle,
      loadingModalClassName,
      loadingMaskStyle,
      loadingMaskClassName,
      loadingPortal,

      // Elements
      itemRender,
      loadingRender,
      prependRender,
      appendRender,

      // Events
      onChange,
      onItemVisibleChange,
      onScroll,
      onScrollEnd,
      onLoad
    },
    ref
  ) => {
    const isFirstLoad = useRef(true)

    const mainRef = useRef<ListAsyncRef | null>(null)

    const pageRef = useRef(1)

    useEffect(() => {
      if (isFirstLoad.current) {
        isFirstLoad.current = false
        mainRef.current?.reload?.('load')
        return
      }
      mainRef.current?.reload?.()
      // eslint-disable-next-line
    }, [url, JSON.stringify(payload)])

    // Expose
    useImperativeHandle(ref, () => {
      return {
        ...(mainRef.current as ListAsyncRef),
        updateCache: (extraCache: Record<string, unknown> = {}) => {
          if (!cacheName) return
          let lastResult = mainRef.current?.getResult?.() as ListLoadResult | null
          if (!lastResult) return
          if (lastResult?.status === 'error') return
          let scrollTop = mainRef.current?.element?.scrollTop
          const nextResult: ListLoadResult = {
            status: lastResult.status,
            code: lastResult.code,
            message: lastResult.message,
            data: {
              ...(lastResult.data ?? {}),
              scrollTop,
              ...extraCache
            }
          }
          void Storage.setItem(cacheName, nextResult)
        },
        clearCache: () => {
          return Storage.removeItem(cacheName!)
        },
        getCache: () => {
          return Storage.getItem(cacheName!)
        }
      } as ListPaginationMainRef
    })

    return (
      <ListAsync
        id={id}
        ref={mainRef}
        value={value}
        formatViewItem={formatViewItem}
        loadData={async ({ previousResult, action }) => {
          if (action === 'load' && cacheName) {
            let cacheResult = await Storage.getItem(cacheName)
            if (cacheResult) {
              return cacheResult as ListLoadResult
            }
          }

          const result = await queryData(url || '', headers, payload, {
            rows: typeof pagination?.rows === 'number' ? pagination?.rows : undefined,
            pageRef,
            previousResult,
            action,
            formatPayload,
            formatResponse
          })

          let newList: ListItem[] | null = null
          if (result.status !== 'error') {
            const prevList = (previousResult?.data?.list || []) as ListItem[]
            const pageList = (result.data?.list || []) as ListItem[]
            newList = action === 'bottomRefresh' ? prevList.concat(pageList) : pageList
          }

          return {
            status: result.status,
            code: result.code,
            message: result.message,
            data: {
              ...(result.data ?? {}),
              list: newList || undefined
            }
          } as ListLoadResult
        }}
        initialLoad={false}
        errorRetry={errorRetry}
        emptyRetry={emptyRetry}
        multiple={multiple}
        allowClear={allowClear}
        checkable={checkable}
        topRefreshEnabled={topRefreshEnabled}
        bottomRefreshEnabled={bottomRefreshEnabled}
        virtual={virtual}
        itemStyle={itemStyle}
        itemClassName={itemClassName}
        itemLayout={itemLayout}
        checkboxVariant={checkboxVariant}
        checkboxPlacement={checkboxPlacement}
        style={style}
        className={className}
        loadingModalStyle={loadingModalStyle}
        loadingModalClassName={loadingModalClassName}
        loadingMaskStyle={loadingMaskStyle}
        loadingMaskClassName={loadingMaskClassName}
        loadingPortal={loadingPortal}
        itemRender={itemRender}
        loadingRender={loadingRender}
        prependRender={prependRender}
        appendRender={appendRender}
        onChange={onChange as ListProps['onChange']}
        onItemVisibleChange={onItemVisibleChange}
        onScroll={onScroll}
        onScrollEnd={onScrollEnd}
        onLoad={async ({ result, action }) => {
          if (action === 'load' && cacheName) {
            let cacheResult = (await Storage.getItem(cacheName)) as ListLoadResult | null
            if (mainRef.current?.element) {
              mainRef.current.element.scrollTop = cacheResult?.data?.scrollTop || 0
            }
          }
          onLoad?.({ result, action })
        }}
      />
    )
  }
)
export default ListMainPagination

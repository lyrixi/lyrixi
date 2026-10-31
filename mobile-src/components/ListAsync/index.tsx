import React, { useImperativeHandle, forwardRef, useRef, useEffect, useState } from 'react'
import scrollToTop from './utils/scrollToTop'
import Loading from './components/Loading'
import EntityList from './List'
import VirtualList from './VirtualList'
import type { ListAsyncProps, ListAsyncRef, ListAsyncLoadAction, ListLoadResult } from './types'
import RetryButton from './components/RetryButton'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
import Result from './../Result'
import List from './../List'
import type { ListItem } from './../List/types'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Result, List } from 'lyrixi-mobile'
测试使用-end */

const ListAsync = forwardRef<ListAsyncRef, ListAsyncProps>(
  (
    {
      // 请求属性
      loadData, // 对应list
      initialLoad = true,
      errorRetry = true,
      onLoad,
      // 加载刷新属性
      topRefreshEnabled = true, // 对应 onTopRefresh
      bottomRefreshEnabled = true, // 对应 onBottomRefresh
      // 重试属性
      emptyRetry,
      // 加载属性
      loadingRender,
      loadingModalStyle,
      loadingModalClassName,
      loadingMaskStyle,
      loadingMaskClassName,
      loadingPortal,

      // 子组件特定属性属性(父组件里构建这两个属性)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      list,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      children,

      // 共用属性
      // Value & Display Value
      value,
      formatViewItem,

      // Status
      multiple,
      allowClear,
      checkable,
      virtual,
      threshold,
      touchStopPropagation,

      // Style
      safeArea,
      style,
      className,
      itemStyle,
      itemClassName,
      itemLayout,
      checkboxVariant,
      checkboxPlacement,

      // Elements
      itemRender,
      prependRender,
      appendRender,

      // Events
      onChange,
      onItemVisibleChange,
      onScroll,
      onScrollEnd,
      onTopRefresh,
      onBottomRefresh
    },
    ref
  ) => {
    const mainRef = useRef<ListAsyncRef | null>(null)

    const [result, setResult] = useState<ListLoadResult | null>(null)

    const [resultStatus, setResultStatus] = useState<string>('')

    const [loadAction, setLoadAction] = useState<ListAsyncLoadAction>('')

    // action: load, reload, topRefresh, bottomRefresh, retry, 其中load和reload的区别是loading的样式
    async function loadPage(action: string) {
      if (typeof loadData !== 'function') return

      if (action === 'bottomRefresh') {
        if (result?.status === 'error') {
          return true
        }
        if (result?.status === 'noMore') {
          return true
        }
        if (result?.status === 'moreError') {
          setResultStatus('loading')
        }
      }

      if (['load', 'reload', 'topRefresh', 'retry'].includes(action)) {
        scrollToTop(mainRef.current?.element ?? null)
      }

      setLoadAction(action as ListAsyncLoadAction)
      let newResult = await loadData({ previousResult: result, action: action })

      if (!['empty', 'error', 'noMore', 'loading'].includes(newResult?.status)) {
        console.error(
          `loadData return data must contains status: ['empty','error','noMore','loading']`,
          newResult
        )
        return false
      }
      setResult(newResult)
      setResultStatus(newResult?.status)
      return true
    }

    function init() {
      loadPage('load')
    }

    useEffect(() => {
      if (!result) return
      onLoad?.({ result, action: loadAction })
      setLoadAction('')
      // eslint-disable-next-line
    }, [result])

    useEffect(() => {
      if (!initialLoad) return
      init()
      // eslint-disable-next-line
    }, [])

    // Expose（与 lyrixi 一致：能力从子列表 ref 透传，避免重复包装）
    useImperativeHandle(ref, () => {
      const c = mainRef.current
      const v = c as ListAsyncRef | null
      return {
        get element() {
          return c?.element ?? null
        },
        scrollToLocation: v?.scrollToLocation,
        reload: (action?: string) => {
          if (action === 'load') {
            init()
          } else {
            loadPage(action || 'reload')
          }
        },
        getResult: () => result
      } as ListAsyncRef
    })

    const ListNode = virtual?.getItemHeight ? VirtualList : EntityList

    return (
      <ListNode
        ref={mainRef as React.Ref<ListAsyncRef>}
        // 子组件特定属性属性
        list={result?.data?.list}
        // 共用属性
        // Value & Display Value
        value={value}
        formatViewItem={
          typeof formatViewItem === 'function'
            ? (rawItem: ListItem, options: { index: number }) =>
                formatViewItem(rawItem, { result, index: options.index })
            : undefined
        }
        // Status
        multiple={multiple}
        allowClear={allowClear}
        checkable={checkable}
        virtual={virtual}
        threshold={threshold}
        touchStopPropagation={touchStopPropagation}
        // Style
        safeArea={safeArea}
        style={style}
        className={DOMUtil.classNames('lyrixi-list-main', className)}
        itemStyle={itemStyle}
        itemClassName={itemClassName}
        itemLayout={itemLayout}
        checkboxVariant={checkboxVariant}
        checkboxPlacement={checkboxPlacement}
        // Elements
        itemRender={itemRender}
        prependRender={prependRender}
        appendRender={appendRender}
        // Events
        onChange={onChange}
        onItemVisibleChange={onItemVisibleChange}
        onScroll={onScroll}
        onScrollEnd={onScrollEnd}
        onTopRefresh={
          topRefreshEnabled
            ? () => {
                onTopRefresh?.()
                return loadPage('topRefresh')
              }
            : undefined
        }
        onBottomRefresh={
          bottomRefreshEnabled
            ? () => {
                onBottomRefresh?.()
                return loadPage('bottomRefresh')
              }
            : undefined
        }
      >
        {bottomRefreshEnabled && ['noMore', 'loading', 'moreError'].includes(resultStatus) ? (
          <List.InfiniteScroll status={resultStatus} content={result?.message} />
        ) : null}
        {['empty', 'error'].includes(resultStatus) && (
          <Result
            className="lyrixi-list-main-result"
            status={resultStatus === 'error' ? '500' : 'empty'}
            title={result?.message}
          >
            <RetryButton
              status={resultStatus}
              errorRetry={errorRetry}
              emptyRetry={emptyRetry}
              onClick={() => loadPage('retry')}
            />
          </Result>
        )}
        <Loading
          type={loadAction}
          loadingRender={loadingRender}
          loadingModalStyle={loadingModalStyle}
          loadingModalClassName={loadingModalClassName}
          loadingMaskStyle={loadingMaskStyle}
          loadingMaskClassName={loadingMaskClassName}
          loadingPortal={loadingPortal}
        />
      </ListNode>
    )
  }
)

export default ListAsync

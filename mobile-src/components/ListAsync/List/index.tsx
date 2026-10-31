import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import List from './List'
import scrollToLocationById from './../utils/scrollToLocation'
import getTopVisibleItem from './../utils/getTopVisibleItem'

import type { ListAsyncRef, ListAsyncProps, ListAsyncScrollToLocationParams } from './../types'

// 内库使用-start
import Page from './../../Page'
import type { PageMainRef } from './../../Page/types'
// 内库使用-end

/* 测试使用-start
import { Page } from 'lyrixi-mobile'
测试使用-end */

// 列表
const EntityList = forwardRef<ListAsyncRef, ListAsyncProps>(
  (
    {
      // 子组件特定属性属性
      list,
      children,

      value,
      formatViewItem,

      // Status
      multiple,
      allowClear,
      checkable,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    const rootRef = useRef<PageMainRef | null>(null)
    const visibleItemIdRef = useRef('')

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current?.element ?? null
        },
        scrollToLocation: (params: ListAsyncScrollToLocationParams) => {
          scrollToLocationById(params, { scrollerElement: rootRef.current?.element })
        }
      }
    })

    function emitTopVisibleItem() {
      if (!onItemVisibleChange) return
      const item = getTopVisibleItem(list, rootRef.current?.element)
      if (!item?.id) return
      const id = String(item.id)
      if (id === visibleItemIdRef.current) return
      visibleItemIdRef.current = id
      onItemVisibleChange(item)
    }

    useEffect(() => {
      emitTopVisibleItem()
      // eslint-disable-next-line
    }, [list])

    function handleScroll(e: React.UIEvent<HTMLElement>) {
      emitTopVisibleItem()
      onScroll?.(e)
    }

    return (
      <Page.Main
        ref={rootRef}
        // Status
        threshold={threshold}
        touchStopPropagation={touchStopPropagation}
        // Style
        safeArea={safeArea}
        className={className}
        style={style}
        // Events
        onTopRefresh={onTopRefresh}
        onBottomRefresh={onBottomRefresh}
        onScroll={onItemVisibleChange || onScroll ? handleScroll : undefined}
        onScrollEnd={onScrollEnd}
      >
        {/* Elements: Prepend */}
        {typeof prependRender === 'function' ? prependRender({ list, value, onChange }) : null}

        {/* Elements: List */}
        {Array.isArray(list) && list.length ? (
          <List
            // Value & Display Value
            value={value}
            list={list}
            formatViewItem={formatViewItem}
            // Status
            multiple={multiple}
            allowClear={allowClear}
            checkable={checkable}
            // Style
            itemStyle={itemStyle}
            itemClassName={itemClassName}
            itemLayout={itemLayout}
            checkboxVariant={checkboxVariant}
            checkboxPlacement={checkboxPlacement}
            // Elements
            itemRender={itemRender}
            // Events
            onChange={onChange}
          />
        ) : null}

        {/* Elements: Append */}
        {typeof appendRender === 'function' ? appendRender({ list, value, onChange }) : null}

        {/* Elements: Children */}
        {children}
      </Page.Main>
    )
  }
)
export default EntityList

import React, { useRef, useMemo, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import constant from './constant'
import flattenList from './flattenList'
import getVisibleItems from './getVisibleItems'
import getTopVisibleVirtualItem from './../utils/getTopVisibleVirtualItem'
import List from './List'

import type { ListAsyncRef, ListAsyncProps, ListAsyncScrollToLocationParams } from './../types'
import type { ListAsyncVirtualListVirtualItem } from './ListAsync.VirtualList.types'

// 内库使用-start
import ValidatorUtil from './../../../utils/ValidatorUtil'
import Page from './../../Page'
import type { ListProps, ListRef, ListItem } from './../../List/types'
import type { PageMainRef } from './../../Page/types'
// 内库使用-end

/* 测试使用-start
import { ValidatorUtil, Page } from 'lyrixi-mobile'
测试使用-end */

// 列表
const VirtualList = forwardRef<ListAsyncRef, ListAsyncProps>(
  (
    {
      // 子组件特定属性属性
      list,
      children,

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
    }: ListAsyncProps,
    ref: React.Ref<ListAsyncRef>
  ) => {
    const rootRef = useRef<PageMainRef | null>(null)

    const listRef = useRef<HTMLDivElement | null>(null)

    const visibleItemIdRef = useRef('')

    // 业务已拉平；同步 group 的 virtualData.type 供高度计算
    const items = useMemo(
      () => flattenList(list as ListItem[] | undefined) as ListAsyncVirtualListVirtualItem[],
      [list]
    )

    // 计算每一项的高度并缓存
    const itemHeights = useMemo(() => {
      if (Array.isArray(items) && items.length && virtual?.getItemHeight) {
        return items.map((item) => virtual.getItemHeight(item as ListItem))
      }
      return []
      // eslint-disable-next-line
    }, [list])

    // 计算总高度
    const totalHeight = itemHeights.reduce((sum, h) => sum + h, 0)

    // Visible Items and set virtualData style
    const [visibleItems, setVisibleItems] = useState<ListAsyncVirtualListVirtualItem[] | null>(null)

    // 初始化完成时更新显示容器
    useEffect(() => {
      if (Array.isArray(list) && list.length) {
        // 列表更新, 底部自定义区域超过一屏高度, 即使列表高度增加, 也会一直保持在底部, 需要滚动到列表可视区域, 避免一直底部刷新
        if (ValidatorUtil.isEmpty(visibleItems) && totalHeight > constant.startBuffer) {
          const el = rootRef.current?.element
          const listEl = listRef.current
          if (el && listEl) {
            const appendHeight = el.scrollHeight - (listEl.offsetTop + listEl.offsetHeight)
            if (appendHeight > el.clientHeight) {
              el.scrollTop = el.scrollTop - appendHeight - constant.startBuffer
            }
          }
        }

        updateVisibleItems()
      } else {
        setVisibleItems(null)
      }
      // eslint-disable-next-line
    }, [list])

    // Expose
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current?.element ?? null
        },
        scrollToLocation: (params: ListAsyncScrollToLocationParams) => {
          const idStr = String(params?.id ?? '')
          const scrollerElement = rootRef.current?.element
          if (!idStr || !scrollerElement) return
          let top = 0
          for (let i = 0; i < items.length; i++) {
            const item = items[i]
            const itemId = item.id ?? (item as ListItem & { _raw?: ListItem })._raw?.id
            if (itemId != null && String(itemId) === idStr) {
              scrollerElement.scrollTop =
                typeof item?.virtualData?.top === 'number' ? item.virtualData.top : top
              return
            }
            top += itemHeights[i] || 0
          }
        }
      }
    })

    // 更新显示容器
    function updateVisibleItems() {
      if (!rootRef.current?.element) return
      const prependHeight = listRef.current?.offsetTop || 0
      requestAnimationFrame(() => {
        const el = rootRef.current?.element
        const newVisibleItems = getVisibleItems({
          prependHeight,
          items,
          itemHeights,
          scrollTop: el?.scrollTop,
          containerHeight: el?.clientHeight || 0
        })
        setVisibleItems(newVisibleItems)

        if (!onItemVisibleChange) return
        const item = getTopVisibleVirtualItem(items, el?.scrollTop || 0, prependHeight)
        if (!item?.id) return
        const id = String(item.id)
        if (id === visibleItemIdRef.current) return
        visibleItemIdRef.current = id
        onItemVisibleChange(item)
      })
    }

    // 滚动
    function handleScroll(e: React.UIEvent<HTMLElement>) {
      updateVisibleItems()
      onScroll?.(e)
    }

    return (
      <Page.Main
        ref={rootRef}
        threshold={threshold}
        touchStopPropagation={touchStopPropagation}
        safeArea={safeArea}
        style={style}
        className={className}
        onTopRefresh={onTopRefresh}
        onBottomRefresh={onBottomRefresh}
        onScroll={handleScroll}
        onScrollEnd={onScrollEnd}
      >
        {/* Elements: Prepend */}
        {typeof prependRender === 'function' ? prependRender({ list, value, onChange }) : null}

        {/* Elements: List */}
        <List
          ref={listRef as React.Ref<ListRef>}
          // Value & Display Value
          height={totalHeight}
          value={value}
          list={visibleItems as ListProps['list']}
          formatViewItem={formatViewItem}
          // Style
          itemStyle={itemStyle}
          itemClassName={itemClassName}
          itemLayout={itemLayout}
          checkboxVariant={checkboxVariant}
          checkboxPlacement={checkboxPlacement}
          // Status
          multiple={multiple}
          allowClear={allowClear}
          checkable={checkable}
          // Elements
          itemRender={itemRender}
          // Events
          onChange={onChange}
        />

        {/* Elements: Append */}
        {typeof appendRender === 'function' ? appendRender({ list, value, onChange }) : null}

        {/* Elements: Children */}
        {children}
      </Page.Main>
    )
  }
)
export default VirtualList

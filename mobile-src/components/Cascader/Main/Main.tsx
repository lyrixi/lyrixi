import React, { forwardRef, useRef, useImperativeHandle, useEffect, useMemo } from 'react'
import flattenListWithAnchors from './flattenListWithAnchors'

import type { CascaderMainViewProps } from './Cascader.Main.Main.types'
import type { CascaderItem } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import LocaleUtil from './../../../utils/LocaleUtil'
import Result from './../../Result'
import List from './../../List'
import Button from './../../Button'
import getTopVisibleItem from './../../ListAsync/utils/getTopVisibleItem'
import scrollToLocation from './../../ListAsync/utils/scrollToLocation'
import type { ListAsyncItem } from './../../ListAsync/types'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, LocaleUtil, List, Result, Button } from 'lyrixi-mobile'
测试使用-end */

// Cast Result to accept only the props we need, since Result's props are all inferred as required
const CascaderResult = Result as React.ComponentType<{
  title?: React.ReactNode
  status?: string
  full?: boolean
  style?: React.CSSProperties
  className?: string
  description?: React.ReactNode
  imageRender?: () => React.ReactNode
  imageUrl?: string | null
  children?: React.ReactNode
}>

export type CascaderMainViewRef = {
  element: HTMLDivElement | null
  scrollToLocation: (params: { id: string | number }) => void
}

const Main = forwardRef<CascaderMainViewRef, CascaderMainViewProps>(
  (
    {
      result,
      value,
      // Style
      style,
      className,
      itemStyle,
      itemClassName,
      // Events
      onReLoad,
      onChange,
      onItemVisibleChange
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const visibleItemIdRef = useRef('')
    const flatList = useMemo(() => flattenListWithAnchors(result?.data?.list), [result?.data?.list])

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        },
        scrollToLocation: (params: { id: string | number }) => {
          scrollToLocation(params, { scrollerElement: rootRef.current })
        }
      }
    })

    function emitTopVisibleItem() {
      if (!onItemVisibleChange) return
      const item = getTopVisibleItem(flatList as ListAsyncItem[], rootRef.current)
      if (!item?.id) return
      const id = String(item.id)
      if (id === visibleItemIdRef.current) return
      visibleItemIdRef.current = id
      onItemVisibleChange(item as CascaderItem)
    }

    useEffect(() => {
      visibleItemIdRef.current = ''
      emitTopVisibleItem()
      // eslint-disable-next-line
    }, [result?.data?.list])

    return (
      <div
        style={style}
        className={DOMUtil.classNames('lyrixi-cascader-main', className)}
        ref={rootRef}
        onScroll={onItemVisibleChange ? () => emitTopVisibleItem() : undefined}
      >
        {result?.status !== 'success' && (
          <CascaderResult title={result?.message} status={result?.status} full>
            {result?.status === 'error' && onReLoad ? (
              <Button
                radius="l"
                variant="solid"
                color="primary"
                style={{ margin: '10px 12px' }}
                onClick={onReLoad}
              >
                {LocaleUtil.locale('重新加载', 'lyrixi_64ca9bab920a2983bcf270320d850d00')}
              </Button>
            ) : null}
          </CascaderResult>
        )}
        {result?.status === 'success' && flatList.length
          ? flatList.map((item, index) => {
              if ((item as CascaderItem & { type?: string }).type === 'group') {
                return (
                  <List.HeaderItem
                    key={String(item.id ?? index)}
                    id={String(item.id)}
                    className="lyrixi-cascader-list-divider"
                    title={item.name ?? item.anchor}
                  />
                )
              }

              return (
                <List.Item
                  key={String(item.id ?? index)}
                  // Value & Display Value
                  id={item.id !== undefined && item.id !== null ? String(item.id) : undefined}
                  _raw={item}
                  checked={value?.some?.((selected) => {
                    return selected.id === item.id
                  })}
                  // Style
                  style={itemStyle}
                  className={DOMUtil.classNames(`lyrixi-cascader-item`, itemClassName)}
                  checkboxVariant="text"
                  checkboxPlacement="right"
                  // Status
                  checkable
                  // Elements
                  title={item.name}
                  // Events
                  onChange={onChange}
                />
              )
            })
          : null}
      </div>
    )
  }
)

export default Main

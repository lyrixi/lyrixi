import React, { Fragment, forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import getAnchorByPoint from './getAnchorByPoint'
import activeAnchor from './activeAnchor'

import type { IndexBarProps, IndexBarRef } from '../types'
import type { ListItem } from '../../List/types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const IndexBar = forwardRef<IndexBarRef, IndexBarProps>(
  (
    {
      // Value & Display Value
      list,
      value,

      // Style
      className,
      style,

      // Events
      onChange
    },
    ref
  ) => {
    // Nodes
    const rootRef = useRef<HTMLDivElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)

    // Touches
    const touchesRef = useRef({
      startX: 0
    })
    const lastEmittedIdRef = useRef('')

    // 外部 value 驱动高亮
    useEffect(() => {
      if (!value?.id) return
      activeAnchor(String(value.id), {
        sidebarElement: rootRef.current,
        tooltipText: value.name
      })
    }, [value?.id, value?.name])

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        },
        get tooltipElement() {
          return tooltipRef.current
        }
      }
    })

    // 按触点选中并回调
    function selectByPoint(x: number, y: number): void {
      const currentId = getAnchorByPoint({ x, y })
      if (!currentId) return

      const item: ListItem = list?.find((i) => String(i.id) === currentId) ?? {
        id: currentId,
        name: currentId
      }
      activeAnchor(currentId, {
        sidebarElement: rootRef.current,
        tooltipElement: tooltipRef.current,
        tooltipText: item.name
      })

      if (currentId === lastEmittedIdRef.current) return
      lastEmittedIdRef.current = currentId
      onChange?.(item)
    }

    function handleTouchStart(e: React.TouchEvent<HTMLDivElement>): void {
      e.stopPropagation()
      // 解决拖动时影响 document 弹性
      e.currentTarget.addEventListener('touchmove', DOMUtil.preventDefault as EventListener, false)

      rootRef.current?.classList.add('lyrixi-active')
      lastEmittedIdRef.current = ''

      touchesRef.current.startX = e.touches[0].clientX
      selectByPoint(touchesRef.current.startX, e.touches[0].clientY)
    }

    function handleTouchMove(e: React.TouchEvent<HTMLDivElement>): void {
      e.stopPropagation()
      selectByPoint(touchesRef.current.startX, e.touches[0].clientY)
    }

    function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>): void {
      e.stopPropagation()
      e.currentTarget.removeEventListener(
        'touchmove',
        DOMUtil.preventDefault as EventListener,
        false
      )

      rootRef.current?.classList.remove('lyrixi-active')
    }

    return (
      <Fragment>
        <div
          style={style}
          className={DOMUtil.classNames(
            'lyrixi-indexbar',
            className,
            !list?.length ? 'lyrixi-hide' : ''
          )}
          ref={rootRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {(list || []).map((item, i) => {
            return (
              <div
                className="lyrixi-indexbar-button"
                data-indexbar-anchor-button={item.id}
                key={item.id || `btn${i}`}
              >
                <div className="lyrixi-indexbar-button-name">{item.name}</div>
              </div>
            )
          })}
        </div>
        <div ref={tooltipRef} className="lyrixi-indexbar-tooltip"></div>
      </Fragment>
    )
  }
)

export default IndexBar

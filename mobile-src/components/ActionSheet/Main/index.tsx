import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import Item from './Item'
import Header from './Header'
import Cancel from './Cancel'

import type { ActionSheetMainProps, ActionSheetMainRef } from './../types'
import type { ListItem } from './../../List/types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const Main = forwardRef<ActionSheetMainRef, ActionSheetMainProps>(
  (
    {
      // Value & Display Value
      id,
      value,
      list: externalList,
      itemStyle,
      itemClassName,
      groupStyle,
      groupClassName,
      title,
      cancel,
      cancelVisible,
      itemRender,
      onChange,
      onCancel,
      onClose
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    // 过滤非法数据
    // eslint-disable-next-line
    const list = externalList?.filter?.((item) => {
      if (!item || (!item.id && !item.name)) return false
      return true
    })

    function handleChange(item: ListItem) {
      onChange?.(item)
    }

    return (
      <>
        <Header title={title} />
        <div
          ref={rootRef}
          id={id}
          style={groupStyle}
          className={DOMUtil.classNames('lyrixi-actionsheet-main', groupClassName)}
        >
          {list &&
            list.map((item, index) => {
              if (typeof itemRender === 'function') {
                return itemRender(item, { onChange: handleChange })
              }

              return (
                <Item
                  key={item?.id || index}
                  id={typeof item?.id === 'string' ? item.id : undefined}
                  checked={item?.id === value?.id}
                  disabled={item?.disabled}
                  style={itemStyle}
                  className={itemClassName}
                  onClick={() => {
                    handleChange(item)
                  }}
                >
                  {item.name}
                </Item>
              )
            })}
        </div>
        <Cancel
          id={id}
          cancel={cancel}
          cancelVisible={cancelVisible}
          onCancel={onCancel}
          onClose={onClose}
        />
      </>
    )
  }
)

export default Main

import React, { Fragment, forwardRef, useRef, useImperativeHandle } from 'react'
import viewFormatter from './viewFormatter'
import getTimeSeparatorVisible from './getTimeSeparatorVisible'
import Item from './../Item'

import type { ChatItem, ChatItemProps, ChatListProps, ChatListRef, ChatViewItem } from './../types'

// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

const List = forwardRef<ChatListRef, ChatListProps>(
  (
    {
      // Value & Display Value
      value,
      list,
      formatViewItem,
      timeSeparator = 60000,
      // Status
      checkable,
      checkboxVariant,
      checkboxPlacement,
      // Events
      onChange
    }: ChatListProps,
    ref: React.ForwardedRef<ChatListRef>
  ) => {
    let displayList = viewFormatter(list, { formatViewItem })

    const rootRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    function renderItem(item: ChatViewItem, index: number) {
      return (
        <Item
          key={String(item.id ?? item._raw?.id ?? index)}
          _raw={(item._raw ?? { id: item.id ?? index }) as Record<string, unknown>}
          checkable={checkable}
          checked={(value?.findIndex?.((valueItem) => valueItem?.id === item.id) ?? -1) >= 0}
          placement={item.placement}
          checkboxVariant={checkboxVariant}
          checkboxPlacement={checkboxPlacement}
          avatarUrl={item.avatarUrl}
          avatarRender={item.avatarRender as ChatItemProps['avatarRender']}
          authorRender={
            (item.authorRender as ChatItemProps['authorRender']) ??
            (item.name ? () => item.name : undefined)
          }
          content={item.content as React.ReactNode}
          onChange={(checked) => {
            let newValue: ChatItem[] = []
            if (!checked) {
              newValue = (value ?? []).filter((valueItem) => valueItem?.id !== item.id)
            } else {
              newValue = [...(value ?? []), item]
            }
            if (onChange) onChange(newValue)
          }}
        />
      )
    }

    let previousDate: Date | null = null

    return (
      <div className="lyrixi-chat-list" ref={rootRef}>
        {displayList?.map?.((item, index) => {
          let bar: React.ReactNode = null
          if (item.time) {
            if (getTimeSeparatorVisible(item.time, previousDate, timeSeparator)) {
              previousDate = item.time
              bar = (
                <div className="lyrixi-chat-divider-time">
                  {DateUtil.format(item.time, 'YYYY-MM-DD hh:mm')}
                </div>
              )
            }
          }

          return (
            <Fragment key={index}>
              {bar}
              {renderItem(item, index)}
            </Fragment>
          )
        })}
      </div>
    )
  }
)

export default List

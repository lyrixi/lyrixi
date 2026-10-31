import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import viewFormatter from './viewFormatter'
import HeaderItem from './../HeaderItem'
import Item from './../Item'

import type { ListProps, ListRef, ListItem, ListViewItem, ListItemChangeOptions } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// List
const List = forwardRef<ListRef, ListProps>(
  (
    {
      // Value & Display Value
      id,
      value,
      list,
      formatViewItem,
      multiple,
      // Status
      allowClear,
      checkable,

      // Style
      style,
      className,
      itemStyle,
      itemClassName,
      itemLayout,
      // Elements
      arrowVisible = false,
      checkboxVariant,
      checkboxPlacement,
      itemRender,
      // Events
      onChange
    }: ListProps,
    ref: React.Ref<ListRef>
  ) => {
    let displayList = viewFormatter(list, { formatViewItem })

    const rootRef = useRef<HTMLDivElement | null>(null)
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    function handleChange(_raw: ListItem, options?: ListItemChangeOptions) {
      let newValue: ListItem | ListItem[] | null = null
      if (multiple) {
        const multipleValue = (value as ListItem[] | undefined) || []
        if (!_raw.checked) {
          newValue = multipleValue.filter((valueItem) => valueItem?.id !== _raw.id)
        } else {
          newValue = [...multipleValue, _raw]
        }
      } else {
        if (!_raw.checked) {
          newValue = allowClear ? null : _raw
        } else {
          newValue = _raw
        }
      }
      onChange?.(newValue, options)
    }

    function renderItem(item: ListViewItem, index: number) {
      let checked = false
      if (value) {
        checked = multiple
          ? (value as ListItem[])?.findIndex?.((valueItem) => valueItem?.id === item?._raw?.id) >= 0
          : (value as ListItem)?.id === item?._raw?.id
      }

      if (typeof itemRender === 'function') {
        return itemRender(item._raw as ListItem, {
          index,
          checked,
          onChange: (changedItem, changeOptions) => {
            handleChange(changedItem, changeOptions)
          }
        })
      }

      return (
        <Item
          key={String(item.id ?? item._raw?.id ?? index)}
          id={String(item.id || '') || String(item?._raw?.id || '') || undefined}
          _raw={item._raw ?? { id: item.id ?? index }}
          checked={checked}
          disabled={item.disabled}
          checkable={item.checkable ?? checkable}
          style={{ ...itemStyle, ...item.style }}
          className={itemClassName}
          layout={itemLayout}
          checkboxVariant={checkboxVariant}
          checkboxPlacement={checkboxPlacement}
          imageUrl={item.imageUrl}
          imageSvg={item.imageSvg}
          imageRender={item.imageRender}
          avatarUrl={item.avatarUrl}
          avatarSvg={item.avatarSvg}
          avatarRender={item.avatarRender}
          title={item.title ?? item.name}
          description={item.description}
          note={item.note}
          content={item.content}
          actionRender={item.actionRender}
          arrowVisible={item.arrowVisible ?? arrowVisible}
          onChange={(changedItem, changeOptions) => {
            handleChange(changedItem, changeOptions)
          }}
        />
      )
    }

    return (
      <div
        id={id}
        className={DOMUtil.classNames('lyrixi-list', className)}
        ref={rootRef}
        style={style}
      >
        {Array.isArray(displayList) &&
          displayList.map((item, index) => {
            if (item.type === 'group') {
              return (
                <HeaderItem
                  key={String(item.id ?? index)}
                  id={item.id ? String(item.id) : undefined}
                  title={item.title ?? item.name}
                  description={item.description}
                  style={item.style}
                  className={item.className}
                />
              )
            }
            return renderItem(item, index)
          })}
      </div>
    )
  }
)
export default List

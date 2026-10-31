import React, { forwardRef, useImperativeHandle, useRef, useState, type CSSProperties } from 'react'
import Item from './Item'

import type { SelectorItem, SelectorProps, SelectorRef } from './../types'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import DOMUtil from './../../../utils/DOMUtil'
import Icon from './../../Icon'
import Icons from '../../../icons'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// 选择组
const Selector = forwardRef<SelectorRef, SelectorProps>(
  (
    {
      // Value & Display Value
      value,
      list: externalList,
      ellipsis, // 省略配置

      // Status
      disabled,
      multiple,
      allowClear, // 单选是否允许取消选择

      // Style
      className,
      style,
      columns = 2, // 列数

      // Elements
      id,

      // Events
      onChange
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement | null>(null)

    function equalsItem(item1: SelectorItem, item2: SelectorItem) {
      if (item1.id && item2.id) {
        return item1.id === item2.id
      } else if (item1.name && item2.name) {
        return item1.name === item2.name
      } else {
        return false
      }
    }

    const [expanded, setExpanded] = useState(false)

    const list = externalList.filter((item) => {
      if (!item || (!item.id && !item.name)) return false
      return true
    })

    const ellipsisCount = ellipsis?.count
    const hasEllipsis = Boolean(ellipsisCount && list.length > ellipsisCount)
    const displayList =
      hasEllipsis && !expanded && ellipsisCount !== null ? list.slice(0, ellipsisCount) : list

    function getIsActive(item: SelectorItem) {
      if (!Array.isArray(value) || !value.length) {
        return false
      }
      for (let activeItem of value) {
        if (equalsItem(item, activeItem)) return true
        continue
      }
      return false
    }

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    async function handleChange(checked: boolean, currentItem: SelectorItem) {
      let newValue: SelectorItem[] = []
      if (!multiple) {
        // 允许取消单选
        if (!checked && allowClear && Array.isArray(value) && value.length === 1) {
          newValue = []
        } else {
          newValue = [currentItem]
        }
      } else {
        const prev = Array.isArray(value) ? value : []
        if (checked) {
          newValue = [...prev, currentItem]
        } else {
          newValue = prev.filter((activeItem) => {
            if (equalsItem(currentItem, activeItem)) return false
            return true
          })
        }
      }

      if (onChange) void onChange(newValue)
    }

    // 处理展开/收起
    const handleToggleExpand = () => {
      setExpanded(!expanded)
    }

    return (
      <div
        ref={rootRef}
        // Elements
        id={id}
        // Style
        style={Object.assign(
          { ['--lyrixi-selector-columns' as string]: columns } as CSSProperties,
          style
        )}
        className={DOMUtil.classNames('lyrixi-selector', className)}
      >
        {/* Elements: Items */}
        {displayList.map((item, index) => {
          return (
            <Item
              key={index}
              id={typeof item.id === 'string' ? item.id : undefined}
              // Status
              disabled={disabled}
              checked={getIsActive(item)}
              // Events
              onChange={(checked: boolean) => {
                void handleChange(checked, item)
              }}
            >
              {item.name}
            </Item>
          )
        })}

        {/* Elements: Ellipsis */}
        {hasEllipsis && (
          <div
            id={id ? `${id}-ellipsis` : undefined}
            className="lyrixi-selector-item lyrixi-selector-item-ellipsis"
            // Events
            onClick={handleToggleExpand}
          >
            <div className="lyrixi-selector-item-name">
              {expanded
                ? LocaleUtil.locale('收起', 'lyrixi_def9e98b60e3bfc493bcd7693e702096')
                : LocaleUtil.locale('更多', 'lyrixi_0ec9eaf9c3525eb110db58aae5912210')}
            </div>
            <Icon
              svg={Icons.ArrowDown}
              size="xxxs"
              className={DOMUtil.classNames(
                'lyrixi-selector-item-ellipsis-icon',
                expanded ? 'lyrixi-selector-item-ellipsis-icon-expanded' : ''
              )}
            />
          </div>
        )}
      </div>
    )
  }
)
export default Selector

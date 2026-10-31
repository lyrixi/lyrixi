import React, { forwardRef, useRef, useImperativeHandle, Fragment } from 'react'

import renderIcon from './../utils/renderIcon'

import type { TabBarItem, TabBarTabsProps, TabBarTabsRef } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const Tabs = forwardRef<TabBarTabsRef, TabBarTabsProps>(
  (
    {
      // Value & Display Value
      id,
      value,
      list = [],
      separator,
      descriptionPlacement = 'bottom',
      // Status
      disabled,
      // Style
      gap,
      size = 'm',
      block,
      style,
      className,
      itemStyle,
      itemClassName,
      // Events
      onChange
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

    // 根据value判断此项是否为选中状态
    function getIsChecked(item: TabBarItem) {
      if (item?.id !== undefined && value?.id !== undefined) {
        return item.id === value.id
      }
      return false
    }

    // 内容DOM
    function getTabs() {
      if (!Array.isArray(list)) {
        return null
      }

      // 遍历
      return list.map((item, index) => {
        const { name, description, placeholder } = item
        let checked = getIsChecked(item)
        return (
          <Fragment key={index}>
            <div
              className={DOMUtil.classNames(
                'lyrixi-tabbar-tabs-tab',
                item?.disabled ? 'lyrixi-disabled' : '',
                checked ? 'lyrixi-active' : '',
                itemClassName
              )}
              style={itemStyle}
              id={typeof item?.id === 'string' ? item.id : undefined}
              onClick={(e) => {
                e.stopPropagation()
                onChange?.(item)
              }}
            >
              {renderIcon(item, { checked })}
              {description && descriptionPlacement === 'top' ? (
                <div className="lyrixi-tabbar-tabs-tab-description">{description}</div>
              ) : null}
              {name && <div className="lyrixi-tabbar-tabs-tab-name">{name}</div>}
              {!name && placeholder ? (
                <div className="lyrixi-tabbar-tabs-tab-placeholder">{placeholder}</div>
              ) : null}
              {description && descriptionPlacement !== 'top' ? (
                <div className="lyrixi-tabbar-tabs-tab-description">{description}</div>
              ) : null}
              {typeof item.contentRender === 'function' ? item.contentRender({ checked }) : null}
            </div>
            {index < list.length - 1 && separator && (
              <div className="lyrixi-tabbar-tabs-separator">{separator}</div>
            )}
          </Fragment>
        )
      })
    }

    return (
      <div
        id={id}
        style={{ gap, ...style }}
        className={DOMUtil.classNames(
          'lyrixi-tabbar-tabs',
          `lyrixi-size-${size}`,
          block ? 'lyrixi-block' : '',
          disabled ? 'lyrixi-disabled' : '',
          className
        )}
        ref={rootRef}
      >
        {getTabs()}
      </div>
    )
  }
)
export default Tabs

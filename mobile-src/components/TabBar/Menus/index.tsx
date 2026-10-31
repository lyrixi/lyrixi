import React, { forwardRef, useRef, useImperativeHandle, Fragment } from 'react'

import renderIcon from './../utils/renderIcon'

import type { TabBarItem, TabBarMenusProps, TabBarMenusRef } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const Menus = forwardRef<TabBarMenusRef, TabBarMenusProps>(
  (
    {
      // Value & Display Value
      id,
      separator,
      value,
      list = [],
      descriptionPlacement,
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
    function getMenus() {
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
                'lyrixi-tabbar-menus-tab',
                item?.disabled ? 'lyrixi-disabled' : '',
                checked ? 'lyrixi-active' : '',
                itemClassName
              )}
              style={itemStyle}
              id={typeof item?.id === 'string' ? item.id : undefined}
              data-index={index}
              onClick={(e) => {
                e.stopPropagation()
                onChange?.(item)
              }}
            >
              {renderIcon(item, { checked }, 'lyrixi-tabbar-menus-tab-icon')}
              {description && descriptionPlacement === 'top' ? (
                <div className="lyrixi-tabbar-menus-tab-description">{description}</div>
              ) : null}
              {name && <div className="lyrixi-tabbar-menus-tab-name">{name}</div>}
              {!name && placeholder ? (
                <div className="lyrixi-tabbar-tabs-tab-placeholder">{placeholder}</div>
              ) : null}
              {description && descriptionPlacement !== 'top' ? (
                <div className="lyrixi-tabbar-menus-tab-description">{description}</div>
              ) : null}
              {typeof item.contentRender === 'function' ? item.contentRender({ checked }) : null}
            </div>

            {index < list.length - 1 && separator && (
              <div className="lyrixi-tabbar-menus-separator">{separator}</div>
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
          'lyrixi-tabbar-menus',
          `lyrixi-size-${size}`,
          block ? 'lyrixi-block' : '',
          disabled ? 'lyrixi-disabled' : '',
          className
        )}
        ref={rootRef}
      >
        {getMenus()}
      </div>
    )
  }
)
export default Menus

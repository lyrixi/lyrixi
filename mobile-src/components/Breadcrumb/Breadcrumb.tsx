import React, { forwardRef, useRef, useImperativeHandle, Fragment } from 'react'

import renderIcon from './utils/renderIcon'

import type { BreadcrumbItem, BreadcrumbProps, BreadcrumbRef } from './types'

// 内库使用-start
import Icons from '../../icons'
import Icon from './../Icon'
import DOMUtil from './../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { Icons, Icon, DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const Breadcrumb = forwardRef<BreadcrumbRef, BreadcrumbProps>(
  (
    {
      // Value & Display Value
      id,
      value,
      list = [],

      // Style
      separator = <Icon svg={Icons.ArrowRight} size="xxxs" color="quaternary" />,
      gap = 4,
      size = 'm',
      block,
      style,
      className,
      itemStyle,
      itemClassName,
      // Status
      disabled,
      descriptionPlacement = 'bottom',

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

    function getIsChecked(item: BreadcrumbItem) {
      if (item?.id !== undefined && value?.id !== undefined) {
        return item.id === value.id
      }
      return false
    }

    function _itemsRender() {
      if (!Array.isArray(list)) {
        return null
      }

      return list.map((item, index) => {
        const { name, description } = item
        const checked = getIsChecked(item)
        const itemDisabled = item?.disabled

        return (
          <Fragment key={index}>
            <div
              style={itemStyle}
              className={DOMUtil.classNames(
                itemClassName,
                'lyrixi-breadcrumb-item',
                checked ? 'lyrixi-active' : '',
                itemDisabled ? 'lyrixi-disabled' : ''
              )}
              id={typeof item?.id === 'string' ? item.id : undefined}
              onClick={(e) => {
                e.stopPropagation()
                if (itemDisabled || checked) {
                  return
                }
                onChange?.(item)
              }}
            >
              {renderIcon(item, { checked }, 'lyrixi-breadcrumb-item-icon')}
              <div className="lyrixi-breadcrumb-item-content">
                {description && descriptionPlacement === 'top' ? (
                  <div className="lyrixi-breadcrumb-item-description">{description}</div>
                ) : null}
                {name ? <div className="lyrixi-breadcrumb-item-name">{name}</div> : null}
                {description && descriptionPlacement !== 'top' ? (
                  <div className="lyrixi-breadcrumb-item-description">{description}</div>
                ) : null}
              </div>
            </div>
            {index < list.length - 1 && separator ? (
              <div className="lyrixi-breadcrumb-separator">{separator}</div>
            ) : null}
          </Fragment>
        )
      })
    }

    return (
      <div
        id={id}
        style={{ gap, ...style }}
        className={DOMUtil.classNames(
          'lyrixi-breadcrumb',
          `lyrixi-size-${size}`,
          block ? 'lyrixi-block' : '',
          disabled ? 'lyrixi-disabled' : '',
          className
        )}
        ref={rootRef}
      >
        {_itemsRender()}
      </div>
    )
  }
)

export default Breadcrumb

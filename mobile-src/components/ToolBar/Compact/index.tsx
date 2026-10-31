import React, { Fragment, forwardRef, type CSSProperties } from 'react'

import type { ToolBarCompactProps, ToolBarCompactRef } from './../types/ToolBar.Compact.types'

// 内库使用-start
import VariablesUtil from './../../../utils/VariablesUtil'
import DOMUtil from './../../../utils/DOMUtil'
import Flex from './../../Flex'
// 内库使用-end

/* 测试使用-start
import { VariablesUtil, DOMUtil, Flex } from 'lyrixi-mobile'
测试使用-end */

const ToolBarCompact = forwardRef<ToolBarCompactRef, ToolBarCompactProps>(
  (
    {
      // Value & Display Value
      id,
      separator = true,
      radius = 'm',
      // Style
      gap,
      justify,
      align,
      direction,
      wrap,
      flex,
      block,
      style,
      className,
      // Elements
      children
    },
    ref
  ) => {
    const radiusValue = VariablesUtil.getRadiusValue(radius)
    const items = React.Children.toArray(children)

    return (
      <Flex
        id={id}
        ref={ref}
        gap={gap}
        justify={justify}
        align={align}
        direction={direction}
        wrap={wrap}
        flex={flex}
        block={block}
        style={
          {
            ...style,
            '--lyrixi-toolbar-compact-radius': radiusValue ? radiusValue : radius
          } as CSSProperties
        }
        className={DOMUtil.classNames('lyrixi-toolbar-compact', className)}
      >
        {items.map((child, index) => {
          const isLast = index === items.length - 1
          const key =
            React.isValidElement(child) && child.key != null
              ? child.key
              : `lyrixi-toolbar-compact-item-${index}`

          return (
            <Fragment key={key}>
              {child}
              {separator && !isLast ? (
                <>
                  {React.isValidElement(separator) ? (
                    separator
                  ) : (
                    <div className={DOMUtil.classNames('lyrixi-toolbar-compact-separator')}></div>
                  )}
                </>
              ) : null}
            </Fragment>
          )
        })}
      </Flex>
    )
  }
)

export default ToolBarCompact

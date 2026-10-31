import React, { Fragment, forwardRef, type CSSProperties } from 'react'
import Button from '../Button'
import Flex from './../../Flex'

import type { ButtonGroupProps, ButtonGroupRef } from './../types'

// 内库使用-start
import VariablesUtil from './../../../utils/VariablesUtil'
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { VariablesUtil, DOMUtil, Flex } from 'lyrixi-mobile'
测试使用-end */

// Button-Group
const ButtonGroup = forwardRef<ButtonGroupRef, ButtonGroupProps>(
  (
    {
      // Value & Display Value
      id,
      list,
      separator = true,
      block = false,
      variant = 'outlined',
      color,
      size = 'm',
      radius = 'm',
      // Style
      className,
      style
    },
    ref
  ) => {
    if (!Array.isArray(list) || list.length === 0) {
      return null
    }

    const radiusValue = VariablesUtil.getRadiusValue(radius)

    return (
      <Flex
        id={id}
        ref={ref}
        block={block}
        flex={block ? 1 : undefined}
        style={
          {
            ...style,
            '--lyrixi-button-group-radius': radiusValue ? radiusValue : radius
          } as CSSProperties
        }
        className={DOMUtil.classNames(
          'lyrixi-button-group',
          {
            'lyrixi-border-width-default': variant === 'outlined',
            'lyrixi-border-style-solid': variant === 'outlined',
            [`lyrixi-border-color-${color ?? 'default'}`]: variant === 'outlined'
          },
          className
        )}
      >
        {list.map((item, index) => {
          const key = item.id ?? `lyrixi-button-group-item-${index}`
          const isLast = index === list.length - 1

          return (
            <Fragment key={key}>
              <Button
                id={item.id}
                variant={variant}
                color={item.color ?? color}
                size={size}
                block={block}
                disabled={item.disabled}
                style={item.style}
                className={item.className}
                onClick={item.onClick}
              >
                {item.name}
              </Button>
              {separator && !isLast ? (
                <>
                  {React.isValidElement(separator) ? (
                    separator
                  ) : (
                    <div className={DOMUtil.classNames(`lyrixi-button-group-separator`)}></div>
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

export default ButtonGroup

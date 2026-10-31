import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import type { CSSProperties } from 'react'

import type { CardProps, CardRef } from './types'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
import VariablesUtil from './../../utils/VariablesUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, VariablesUtil } from 'lyrixi-mobile'
测试使用-end */

const Card = forwardRef<CardRef, CardProps>(
  (
    {
      // Value & Display Value
      id,
      radius,
      // Style
      style,
      className,
      // Elements
      children,
      // Events
      onClick
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)

    const radiusClass = typeof radius === 'string' ? VariablesUtil.getRadiusClass(radius) : ''
    const radiusValue = VariablesUtil.getRadiusValue(radius)
    const computedStyle = {
      ...(radiusClass
        ? ({
            '--lyrixi-card-radius': radiusValue
          } as CSSProperties)
        : {}),
      ...(!radiusClass && radius ? { borderRadius: radius as string | number } : {}),
      ...style
    } as CSSProperties

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    return (
      <div
        id={id}
        ref={rootRef}
        style={computedStyle}
        className={(DOMUtil.classNames as (...args: unknown[]) => string)(
          'lyrixi-card',
          radiusClass,
          className
        )}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }
)

export default Card

import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import getStyle from './getStyle'

import type { ButtonProps, ButtonRef } from './../types'

const Button = forwardRef<ButtonRef, ButtonProps>(
  (
    {
      // Value & Display Value
      id,
      direction = 'horizontal',
      block,
      variant = 'solid',
      color = 'default',
      size,
      square,
      fontSize,
      radius,
      // Status
      disabled,
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

    const { style: newStyle, className: newClassName } = getStyle({
      variant,
      color,
      size: size || 'm',
      square,
      fontSize,
      radius,
      direction,
      block: block || false,
      style,
      className
    })

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    return (
      <div
        ref={rootRef}
        id={id}
        style={newStyle}
        className={newClassName}
        onClick={onClick}
        {...({ disabled } as { disabled?: boolean })}
      >
        {children}
      </div>
    )
  }
)

export default Button

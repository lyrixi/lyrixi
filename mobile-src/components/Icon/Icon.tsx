import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import getStyle from './getStyle'
import type { IconProps, IconRef } from './types'

const Icon = forwardRef<IconRef, IconProps>(
  (
    {
      // Value & Display Value
      id,
      svg: Svg,
      src,
      // Status
      disabled,
      // Value & Display Value
      variant = 'text',
      color,
      size = 'm',
      radius,
      // Style
      style,
      className,
      // Events
      onClick,
      onTouchStart
    },
    ref
  ) => {
    const rootRef = useRef<HTMLElement | null>(null)

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    const { style: newStyle, className: newClassName } = getStyle({
      variant,
      color,
      size,
      radius,
      style,
      className
    })

    return (
      <span
        id={id}
        ref={rootRef}
        role="img"
        {...({ disabled } as React.HTMLAttributes<HTMLElement>)}
        style={newStyle}
        className={newClassName}
        onClick={onClick}
        onTouchStart={onTouchStart}
      >
        {src ? (
          <img className="lyrixi-icon-img" src={src} alt="" aria-hidden />
        ) : (
          Svg && <Svg className="lyrixi-icon-svg" aria-hidden focusable="false" />
        )}
      </span>
    )
  }
)

export default Icon

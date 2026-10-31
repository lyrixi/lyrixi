import React, { useRef, forwardRef, useImperativeHandle } from 'react'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import Button from './../../Button'
import type { ButtonRef } from './../../Button/types'
import type { ToolBarButtonProps } from '../types/ToolBar.Button.types'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Button, type ButtonProps, type ButtonRef } from 'lyrixi-mobile'
测试使用-end */

const ToolBarButton = forwardRef<ButtonRef, ToolBarButtonProps>(
  (
    {
      // Value & Display Value
      id,
      // Style
      direction,
      block,
      variant,
      color,
      size,
      square,
      fontSize,
      radius = 'm',
      style,
      className,

      // Elements
      children,

      // Events
      onClick
    },
    ref
  ) => {
    const rootRef = useRef<ButtonRef | null>(null)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current?.element ?? null
        }
      }
    })

    return (
      <Button
        id={id}
        ref={rootRef}
        // Style
        block={block}
        variant={variant}
        color={color}
        direction={direction}
        size={size}
        radius={radius}
        square={square}
        fontSize={fontSize}
        className={DOMUtil.classNames('lyrixi-toolbar-button', className)}
        style={style}
        // Events
        onClick={onClick}
      >
        {/* Elements: Children */}
        {children}
      </Button>
    )
  }
)

export default ToolBarButton

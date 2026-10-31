import React, { useImperativeHandle, forwardRef, useRef } from 'react'

import getStyle from './getStyle'
import Ellipsis from './Ellipsis'
import renderHighlight from './renderHighlight'

import type { TextProps, TextRef } from './types'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const Text = forwardRef<TextRef, TextProps>(
  (
    {
      // Value & Display Value
      id,
      highlight,

      // Status
      ellipsis, // { rows: Number, expandable: Boolean, defaultExpanded: Boolean }

      // Style
      block = false,
      color,
      fontSize,
      fontWeight,
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

    // color,fontSize,fontWeight转为className或者指定style
    let { style: newStyle, className: newClassName } = getStyle({
      // Style
      color,
      fontSize,
      fontWeight,
      style,
      className
    })

    // Expose
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    // 处理高亮
    const content = highlight ? renderHighlight(children, highlight) : children

    return (
      <div
        id={id}
        ref={rootRef}
        // Style
        className={DOMUtil.classNames(
          'lyrixi-text',
          block ? 'lyrixi-text-block' : '',
          newClassName
        )}
        style={newStyle}
        // Events
        onClick={onClick}
      >
        {ellipsis?.rows ? <Ellipsis ellipsis={ellipsis}>{content}</Ellipsis> : content}
      </div>
    )
  }
)
export default Text

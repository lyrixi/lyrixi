import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react'
import AccordionTransition from './AccordionTransition'

import type { AccordionProps, AccordionRef } from './types'

// 内库使用-start
import Icons from '../../icons'
import DOMUtil from './../../utils/DOMUtil'
import Icon from './../Icon'

// 内库使用-end

/* 测试使用-start
import { DOMUtil, Icon, Icons } from 'lyrixi-mobile'
测试使用-end */

// Accordion组件
const Accordion = forwardRef<AccordionRef, AccordionProps>(
  (
    {
      // Value & Display Value
      id,
      // Status
      open: externalOpen,
      defaultOpen = false,

      // Style
      headerStyle,
      titleStyle,
      style,
      className,

      // Behavior
      minHeight,

      // Elements
      title,
      headerRender,
      ellipsis, // {expandText, collapseText}
      ellipsisRender,
      arrowClassName,
      arrowPlacement = 'right',
      arrowRender,
      children,

      // Events
      onOpen,
      onClose
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)

    // 受控组件
    const isControlled = typeof externalOpen === 'boolean'

    // 非受控组件
    const [innerOpen, setInnerOpen] = useState(defaultOpen)

    // 最终的open状态
    const open = isControlled ? externalOpen : innerOpen

    const toggle = (newOpen: boolean) => {
      // 非受控组件
      if (!isControlled) {
        setInnerOpen(newOpen)
      }

      // 受控和非受控组件都需要触发事件
      if (newOpen) {
        onOpen?.()
      } else {
        onClose?.()
      }
    }

    // Expose
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        },
        open: () => {
          toggle(true)
        },
        close: () => {
          toggle(false)
        }
      }
    })

    const handleClick = () => {
      toggle(!open)
    }

    // 获取箭头节点
    function renderArrow() {
      if (typeof arrowRender === 'function') {
        return <div className="lyrixi-accordion-arrow">{arrowRender({ open })}</div>
      }

      return (
        <div className="lyrixi-accordion-arrow">
          <Icon svg={Icons.ArrowUp} className={arrowClassName} size="xxxs" />
        </div>
      )
    }

    const ArrowNode = renderArrow()

    // 获取Header节点
    function renderHeader() {
      if (typeof headerRender === 'function') {
        return headerRender({
          open,
          onClick: handleClick
        })
      }

      if (!title) {
        return null
      }

      return (
        <div
          id={id ? `${id}-header` : undefined}
          className="lyrixi-accordion-header"
          style={headerStyle}
          onClick={handleClick}
        >
          {arrowPlacement === 'left' && ArrowNode}
          <div className="lyrixi-accordion-header-title" style={titleStyle}>
            {title}
          </div>
          {arrowPlacement === 'right' && ArrowNode}
        </div>
      )
    }

    // 获取Footer节点
    function renderEllipsis() {
      if (typeof ellipsisRender === 'function') {
        return ellipsisRender({
          open,
          onClick: handleClick
        })
      }

      if (!ellipsis?.collapseText || !ellipsis?.expandText) {
        return null
      }

      return (
        <div
          id={id ? `${id}-ellipsis` : undefined}
          className="lyrixi-accordion-ellipsis"
          onClick={handleClick}
        >
          {arrowPlacement === 'left' && ArrowNode}
          <div className="lyrixi-accordion-ellipsis-title">
            {open ? ellipsis?.collapseText : ellipsis?.expandText}
          </div>
          {arrowPlacement === 'right' && ArrowNode}
        </div>
      )
    }

    return (
      <div
        id={id}
        ref={rootRef}
        // Style
        style={style}
        className={DOMUtil.classNames('lyrixi-accordion', className, open ? 'lyrixi-active' : '')}
      >
        {/* Elements: Header */}
        {renderHeader()}

        {/* Elements: Main */}
        <AccordionTransition open={open} minHeight={minHeight}>
          <div className="lyrixi-accordion-main">{children}</div>
        </AccordionTransition>

        {/* Elements: Footer */}
        {renderEllipsis()}
      </div>
    )
  }
)

export default Accordion

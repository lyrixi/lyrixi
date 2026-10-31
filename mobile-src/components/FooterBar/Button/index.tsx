import React, { Fragment, useRef, forwardRef, useImperativeHandle, useState } from 'react'

import type { FooterBarButtonProps, FooterBarButtonRef } from './../types'
import type { FooterBarButtonComponents } from '../types/FooterBar.Button.types'

// 内库使用-start
import ActionSheet from './../../ActionSheet'
import Button from './../../Button'
import type { ButtonRef } from './../../Button/types'
import type { ModalRef } from './../../Modal/types'
// 内库使用-end

/* 测试使用-start
import { ActionSheet, Icon } from 'lyrixi-mobile'
测试使用-end */

const FooterBarButton = forwardRef<FooterBarButtonRef, FooterBarButtonProps>(
  (
    {
      // Button: Style
      direction,
      block,
      variant = 'text',
      color,
      size = 'l',
      square,
      fontSize,
      radius = 'l',
      style,
      className,

      // Button: Status
      disabled,

      // Button: Elements
      children,

      // Modal: Value & Display Value
      list,

      // Modal: Style
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,

      // Modal: Elements
      portal,

      // Events
      onClick,
      onChange
    },
    ref
  ) => {
    const comboRef = useRef<ButtonRef>(null)
    const modalRef = useRef<ModalRef | null>(null)

    // Modal: Status
    const [open, setOpen] = useState(false)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return comboRef.current?.element ?? null
        }
      }
    })

    return (
      <Fragment>
        {/* Elements: Button */}
        <Button
          ref={comboRef}
          // Button: Style
          variant={variant}
          color={color}
          size={size}
          fontSize={fontSize}
          radius={radius}
          square={square}
          direction={direction}
          block={block}
          style={style}
          className={className}
          // Button: Status
          disabled={disabled}
          // Events
          onClick={(e) => {
            setOpen(true)
            if (onClick) onClick(e)
          }}
        >
          {children}
        </Button>

        {/* Elements: ActionSheet Modal */}
        {list?.length ? (
          <ActionSheet.Modal
            ref={modalRef}
            // Modal: Value & Display Value
            list={list}
            // Modal: Status
            open={open}
            // Modal: Style
            maskStyle={maskStyle}
            maskClassName={maskClassName}
            modalStyle={modalStyle}
            modalClassName={modalClassName}
            // Modal: Elements
            portal={portal}
            // Events
            onChange={(item) => {
              if (item) onChange?.(item)
            }}
            onClose={() => {
              setOpen(false)
            }}
          />
        ) : null}
      </Fragment>
    )
  }
)

export default FooterBarButton as FooterBarButtonComponents

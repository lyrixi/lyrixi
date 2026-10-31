import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import type { ToolBarFilterProps, ToolBarFilterRef } from './../types'

// 内库使用-start
import Icons from '../../../icons'
import DOMUtil from './../../../utils/DOMUtil'
import FilterModal from './../../Modal/FilterModal'
import Button from './../../Button'
import type { ButtonRef } from './../../Button/types'
import Icon from './../../Icon'

// 内库使用-end

/* 测试使用-start
import { DOMUtil, Modal, Button, Icon, Icons, type ButtonRef } from 'lyrixi-mobile'
const FilterModal = Modal.FilterModal
测试使用-end */

const Filter = forwardRef<ToolBarFilterRef, ToolBarFilterProps>(
  (
    {
      // Value & Display Value
      id,
      // Style
      direction,
      block,
      style,
      className,
      color = 'default',
      variant = 'text',
      size,
      square,
      fontSize,
      radius = 'm',

      maskStyle,
      maskClassName,
      modalStyle,
      modalClassName,

      // Elements
      children,
      comboRender,
      modalRender,
      portal,
      footerRender,

      // Events
      onCancel,
      onOpen,
      onClose
    },
    ref
  ) => {
    const comboRef = useRef<ButtonRef | null>(null)

    const [open, setOpen] = useState<boolean | null>(null)

    useEffect(() => {
      if (typeof open !== 'boolean') return
      if (open) {
        onOpen?.()
      } else {
        onClose?.()
      }
      // eslint-disable-next-line
    }, [open])

    // Expose
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return comboRef.current?.element ?? null
        },
        close: () => {
          setOpen(false)
        },
        open: () => {
          setOpen(true)
        }
      }
    })

    // 获取标题节点
    function renderCombo() {
      if (typeof comboRender === 'function') {
        return comboRender({
          comboRef,
          open: open,
          onClick: () => {
            setOpen(true)
          }
        })
      }

      return (
        <Button
          ref={comboRef}
          id={id}
          // Style
          variant={variant}
          color={color}
          direction={direction}
          block={block}
          fontSize={fontSize}
          size={size}
          square={square}
          radius={radius}
          className={DOMUtil.classNames('lyrixi-toolbar-button', className)}
          style={style}
          // Events
          onClick={() => {
            setOpen(true)
          }}
        >
          {/* comboChildren */}
          {children || <Icon svg={Icons.FilterMenu} size="xs" />}
        </Button>
      )
    }

    const ComboNode = renderCombo()

    const modalOpen = open ?? false

    return (
      <>
        {/* Combo */}
        {ComboNode}

        {/* Modal */}
        <FilterModal
          // Status
          open={modalOpen}
          // Style
          maskStyle={maskStyle}
          maskClassName={maskClassName}
          modalStyle={modalStyle}
          modalClassName={modalClassName}
          // Elements
          portal={portal}
          footerRender={footerRender}
          // Events
          onCancel={onCancel}
          onClose={() => {
            setOpen(false)
          }}
        >
          {modalRender?.({
            open: open,
            onClose: () => {
              setOpen(false)
            }
          })}
        </FilterModal>
      </>
    )
  }
)

export default Filter

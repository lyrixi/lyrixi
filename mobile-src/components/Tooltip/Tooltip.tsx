import React, { forwardRef, useRef, useEffect, useImperativeHandle, useState } from 'react'

import Popup from './Popup'
import updatePositionByReferenceElement from './api/updatePositionByReferenceElement'

import type { TooltipProps } from './types'
import type { TooltipPopupRef } from './Tooltip.Popup.types'
// 内库使用-start
import Combo from './../Combo'
import type { ComboRef } from './../Combo/types'
// 内库使用-end

/* 测试使用-start
import { Combo, type ComboRef } from 'lyrixi-mobile'
测试使用-end */

const Tooltip = forwardRef<Record<string, unknown>, TooltipProps>(
  (
    {
      // Value & Display Value
      id,
      // Status
      maskClosable = true,
      // Style
      style,
      className,
      // Value & Display Value
      animation = 'slideDownLeft',
      // Style
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,
      // Elements
      children,
      comboRender,
      modalRender,
      // Value & Display Value
      referenceElement: externalReferenceElement,
      // Elements
      portal,
      // Events
      onBeforeOpen,
      onOpen,
      onClose
    },
    ref
  ) => {
    const [open, setOpen] = useState<boolean | null>(null)

    const modalRef = useRef<TooltipPopupRef | null>(null)

    const comboRef = useRef<ComboRef | null>(null)

    useEffect(() => {
      if (open) {
        updatePosition()
      }
      if (typeof open !== 'boolean') return
      if (open) {
        if (typeof onOpen === 'function') onOpen()
      } else {
        if (typeof onClose === 'function') onClose()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    useImperativeHandle(ref, () => {
      return {
        ...(typeof comboRef.current === 'object' && comboRef.current !== null
          ? (comboRef.current as unknown as Record<string, unknown>)
          : {}),
        ...(typeof modalRef.current === 'object' && modalRef.current !== null
          ? (modalRef.current as unknown as Record<string, unknown>)
          : {})
      }
    })

    function updatePosition(targetReferenceElement?: HTMLElement | null) {
      let referenceElement: HTMLElement | null | undefined =
        typeof externalReferenceElement === 'function'
          ? (externalReferenceElement() as HTMLElement | null)
          : (externalReferenceElement as HTMLElement | null | undefined)
      if (targetReferenceElement) {
        referenceElement = targetReferenceElement
      }

      if (!referenceElement) {
        referenceElement = comboRef.current?.element ?? undefined
      }

      const modalElement = modalRef.current?.modalElement ?? null

      if (referenceElement && modalElement) {
        if (!modalStyle?.left && !modalStyle?.top && !modalStyle?.right && !modalStyle?.bottom) {
          updatePositionByReferenceElement(modalElement, {
            referenceElement: referenceElement,
            animation: animation,
            offset: {
              top: 8,
              bottom: 8
            }
          })
        }
      }
    }
    // eslint-disable-line

    async function handleOpen() {
      if (open !== true) {
        if (typeof onBeforeOpen === 'function') {
          const goOn = await onBeforeOpen()
          if (goOn === false) return
        }
      }

      if (!modalStyle?.left && !modalStyle?.top && !modalStyle?.right && !modalStyle?.bottom) {
        const el = comboRef.current ? comboRef.current.element : null
        updatePosition(el)
      }

      setOpen((prev) => !prev)
    }

    function renderCombo() {
      if (typeof comboRender === 'function') {
        return comboRender({
          comboRef,
          open: open,
          onClick: handleOpen
        })
      }

      if (children) {
        return (
          <Combo ref={comboRef} id={id} style={style} className={className} onClick={handleOpen}>
            {children}
          </Combo>
        )
      }

      return null
    }

    return (
      <>
        {renderCombo()}

        <Popup
          ref={modalRef}
          id={id}
          open={!!open}
          maskClosable={maskClosable}
          animation={animation}
          modalStyle={modalStyle}
          modalClassName={modalClassName}
          maskStyle={maskStyle}
          maskClassName={maskClassName}
          portal={portal}
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
        </Popup>
      </>
    )
  }
)
export default Tooltip

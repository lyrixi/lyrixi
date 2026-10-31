import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react'

// 组件
import ButtonNumber from './ButtonNumber'
import ButtonAction from './ButtonAction'
import ButtonQuick from './ButtonQuick'

import type { KeyboardNumberProps, KeyboardNumberRef } from './../types'
import type { ModalRef } from './../../Modal/types'

// 内库使用-start
import Icons from '../../../icons'
import LocaleUtil from './../../../utils/LocaleUtil'
import DOMUtil from './../../../utils/DOMUtil'
import SafeArea from './../../SafeArea'
import Page from '../../Page'
import Flex from '../../Flex'
import Icon from './../../Icon'
import Modal from './../../Modal/Modal'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, DOMUtil, SafeArea, Page, Flex, Icon, Icons, Modal } from 'lyrixi-mobile'
测试使用-end */

const KeyboardNumber = forwardRef<KeyboardNumberRef, KeyboardNumberProps>(
  (
    {
      // Value & Display Value
      id,
      value = '',
      dot,
      minus,
      // Status
      safeArea = true,
      okVisible,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      cancelVisible,
      open,
      // Style
      modalStyle,
      modalClassName,
      // Elements
      portal,
      ok,
      cancel,
      // Events
      onChange,
      onOk,
      onCancel,
      onClose
    },
    ref
  ) => {
    const isDeleteInMainRef = useRef(false)
    const modalRef = useRef<ModalRef | null>(null)

    // open 时给 root/body 增加样式
    useEffect(() => {
      const container = document.getElementById('root') || document.body
      const className = 'lyrixi-page-keyboard-number-open'

      if (open) {
        // 键盘弹出后增加页面高度
        container.classList.add(className)
      } else {
        // 键盘关闭后减少页面高度
        container.classList.remove(className)
      }

      return () => {
        container.classList.remove(className)
      }

      // eslint-disable-next-line
    }, [open])

    useEffect(() => {
      if (!open) return
      let openTime = Date.now()

      const handleOutsideClick = (event: MouseEvent) => {
        if (Date.now() - openTime < 100) return
        const modalElement = modalRef.current?.modalElement
        if (!modalElement) return
        if (modalElement.contains(event.target as Node)) return
        if (onClose) {
          onClose()
        }
      }

      document.addEventListener('click', handleOutsideClick)

      return () => {
        document.removeEventListener('click', handleOutsideClick)
      }
    }, [open, onClose])

    useImperativeHandle(ref, () => ({
      get element() {
        return modalRef.current?.modalElement ?? null
      }
    }))

    const handleNumber = (num: React.ReactNode) => {
      let newValue = value + String(num ?? '')
      if (onChange) {
        onChange(newValue, { action: 'number' })
      }
    }

    const handleDot = () => {
      const currentValue = value || ''
      const newValue = currentValue + '.'
      if (onChange) {
        onChange(newValue, { action: 'dot' })
      }
    }

    const handleMinus = () => {
      const currentValue = value || ''
      const newValue = currentValue + '-'
      if (onChange) {
        onChange(newValue, { action: 'minus' })
      }
    }

    const handleDelete = () => {
      let newValue = ''
      if (value.length > 0) {
        newValue = value.slice(0, -1)
      }
      if (onChange) {
        onChange(newValue, { action: 'delete' })
      }
    }

    const handleOk = async () => {
      if (onOk) {
        let goOn = await onOk(value)
        if (goOn === false) return
      }
      onClose?.()
    }

    const handleCancel = () => {
      if (onCancel) {
        onCancel()
      }
      if (onClose) {
        onClose()
      }
    }

    function renderOperateRow() {
      isDeleteInMainRef.current = true
      if (!okVisible && !dot && !minus) {
        return (
          <>
            <ButtonNumber className="lyrixi-keyboard-empty">{/* 空位 */}</ButtonNumber>
            <ButtonNumber onClick={handleNumber}>0</ButtonNumber>
            <ButtonNumber onClick={handleDelete}>
              <Icon svg={Icons.KeyboardDelete} className="lyrixi-keyboard-icon" />
            </ButtonNumber>
          </>
        )
      }
      if (!okVisible && ((dot && !minus) || (!dot && minus))) {
        return (
          <>
            {dot && <ButtonNumber onClick={handleDot}>.</ButtonNumber>}
            {minus && <ButtonNumber onClick={handleMinus}>-</ButtonNumber>}
            <ButtonNumber onClick={handleNumber}>0</ButtonNumber>
            <ButtonNumber onClick={handleDelete}>
              <Icon svg={Icons.KeyboardDelete} className="lyrixi-keyboard-icon" />
            </ButtonNumber>
          </>
        )
      }

      isDeleteInMainRef.current = false
      return (
        <>
          {dot ? (
            <ButtonNumber onClick={handleDot}>.</ButtonNumber>
          ) : (
            <ButtonNumber className="lyrixi-keyboard-empty"></ButtonNumber>
          )}
          <ButtonNumber onClick={handleNumber}>0</ButtonNumber>
          {minus ? (
            <ButtonNumber onClick={handleMinus}>-</ButtonNumber>
          ) : (
            <ButtonNumber className="lyrixi-keyboard-empty"></ButtonNumber>
          )}
        </>
      )
    }

    return (
      <Modal
        ref={modalRef}
        id={id}
        open={open}
        maskClosable={true}
        animation="slideUp"
        modalStyle={modalStyle}
        modalClassName={DOMUtil.classNames(
          'lyrixi-modal-keyboard-number',
          modalClassName,
          okVisible ? 'lyrixi-keyboard-has-ok' : ''
        )}
        maskClassName="lyrixi-mask-keyboard-number"
        portal={portal}
        onClose={onClose}
      >
        <Page.Header>
          <ButtonQuick id={id ? `${id}-cancel` : undefined} onClick={handleCancel}>
            {!cancel ? (
              <Icon size="xxs" svg={Icons.ArrowDown} className="lyrixi-keyboard-icon" />
            ) : (
              cancel
            )}
          </ButtonQuick>
        </Page.Header>

        <Flex flex={1} direction="horizontal">
          {/* 数字区 */}
          <div className="lyrixi-flex-1">
            <div className="lyrixi-keyboard-main-row">
              <ButtonNumber onClick={handleNumber}>1</ButtonNumber>
              <ButtonNumber onClick={handleNumber}>2</ButtonNumber>
              <ButtonNumber onClick={handleNumber}>3</ButtonNumber>
            </div>

            <div className="lyrixi-keyboard-main-row">
              <ButtonNumber onClick={handleNumber}>4</ButtonNumber>
              <ButtonNumber onClick={handleNumber}>5</ButtonNumber>
              <ButtonNumber onClick={handleNumber}>6</ButtonNumber>
            </div>

            <div className="lyrixi-keyboard-main-row">
              <ButtonNumber onClick={handleNumber}>7</ButtonNumber>
              <ButtonNumber onClick={handleNumber}>8</ButtonNumber>
              <ButtonNumber onClick={handleNumber}>9</ButtonNumber>
            </div>

            <div className="lyrixi-keyboard-main-row">{renderOperateRow()}</div>
          </div>

          {/* 侧边 */}
          <Flex direction="vertical">
            {isDeleteInMainRef.current === false && (
              <ButtonAction
                id={id ? `${id}-delete` : undefined}
                className="lyrixi-delete"
                onClick={handleDelete}
              >
                <Icon svg={Icons.KeyboardDelete} className="lyrixi-keyboard-icon" />
              </ButtonAction>
            )}

            {okVisible && (
              <ButtonAction
                id={id ? `${id}-ok` : undefined}
                className="lyrixi-ok"
                onClick={handleOk}
              >
                {ok || LocaleUtil.locale('确定', 'lyrixi_38cf16f2204ffab8a6e0187070558721')}
              </ButtonAction>
            )}
          </Flex>
        </Flex>
        {safeArea && <SafeArea className="lyrixi-border-t" style={{ backgroundColor: 'white' }} />}
      </Modal>
    )
  }
)
export default KeyboardNumber

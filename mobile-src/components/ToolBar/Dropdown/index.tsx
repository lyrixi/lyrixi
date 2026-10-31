import React, {
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
  forwardRef,
  type MouseEvent
} from 'react'
import closeAllDropdown from './../utils/closeAllDropdown'
import Combo from './../components/Combo'

import type { ToolBarComboRef } from './../types/ToolBar.common.types'
import type { ToolBarDropdownProps, ToolBarDropdownRef } from './../types'

// 内库使用-start
import IdUtil from './../../../utils/IdUtil'
import DOMUtil from './../../../utils/DOMUtil'
import DropdownModal from './../../Modal/DropdownModal'
import Icons from '../../../icons'
// 内库使用-end

/* 测试使用-start
import { IdUtil, DOMUtil, Modal } from 'lyrixi-mobile'
const DropdownModal = Modal.DropdownModal
测试使用-end */

const Dropdown = forwardRef<ToolBarDropdownRef, ToolBarDropdownProps>(
  (
    {
      // Combo: Style
      direction,
      block,
      color = 'default',
      variant = 'text',
      size,
      square,
      radius = 'm',
      fontSize,
      style,
      className,

      // Combo: Elements
      children,
      comboRender,
      arrowRender,
      arrowSvg = Icons.TriangleUpFill,

      // Modal: Style
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,
      offset = {
        top: 6
      },
      left,
      right,

      // Modal: Elements
      portal,
      modalRender,

      // Events
      onBeforeOpen,
      onOpen,
      onClose
    },
    ref
  ) => {
    const [open, setOpen] = useState<boolean | null>(null)

    const comboRef = useRef<ToolBarComboRef | null>(null)

    // 唯一id，用于关闭时排除其他dropdown
    const idRef = useRef<string>(IdUtil.randomUUID())

    // 注册当前实例到全局集合
    useEffect(() => {
      if (!window.dropdowns) {
        window.dropdowns = {}
      }
      const map = window.dropdowns
      map[idRef.current] = {
        close: () => setOpen(false),
        open: () => setOpen(true)
      }

      // 组件卸载时移除实例
      return () => {
        // eslint-disable-next-line
        delete map[idRef.current]
      }
      // eslint-disable-next-line
    }, [])

    useEffect(() => {
      if (typeof open !== 'boolean') return
      // 打开前先关闭其他所有 dropdown
      if (open) {
        closeAllDropdown({ exceptId: idRef.current })
        onOpen?.()
      } else {
        onClose?.()
      }
      // eslint-disable-next-line
    }, [open])

    // Expose
    useImperativeHandle(ref, () => {
      const cr = comboRef.current
      return {
        get element() {
          return cr?.element ?? null
        },
        close: () => {
          setOpen(false)
        },
        open: () => {
          setOpen(true)
        }
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function handleClick(e: MouseEvent) {
      let newOpen = !open
      if (!newOpen) {
        setOpen(false)
        return
      }

      if (typeof onBeforeOpen === 'function') {
        let goOn = await onBeforeOpen()
        if (goOn === false) return
      }

      setOpen(true)
    }

    // 获取标题节点
    function renderCombo() {
      if (typeof comboRender === 'function') {
        return comboRender({
          comboRef,
          open: open,
          onClick: handleClick
        })
      }
      return (
        <Combo
          ref={comboRef}
          // Status
          open={open}
          // Style
          style={style}
          className={className}
          variant={variant}
          color={color}
          square={square}
          direction={direction}
          block={block}
          fontSize={fontSize}
          radius={radius}
          size={size}
          // Elements
          arrowRender={arrowRender}
          arrowSvg={arrowSvg}
          // Events
          onClick={handleClick}
        >
          {children}
        </Combo>
      )
    }

    const ComboNode = renderCombo()

    const modalOpen = open ?? false

    return (
      <>
        {/* Combo */}
        {ComboNode}

        {/* Modal */}
        <DropdownModal
          // Status
          open={modalOpen}
          // Style
          maskStyle={maskStyle}
          maskClassName={DOMUtil.classNames('lyrixi-mask-toolbar-dropdown', maskClassName)}
          modalStyle={modalStyle}
          modalClassName={DOMUtil.classNames('lyrixi-modal-toolbar-dropdown', modalClassName)}
          // Elements
          portal={portal}
          offset={offset}
          left={left}
          right={right}
          referenceElement={comboRef.current?.element}
          // Events
          onClose={() => setOpen(false)}
        >
          {modalRender?.({
            open: open,
            onClose: () => setOpen(false)
          })}
        </DropdownModal>
      </>
    )
  }
)

export default Dropdown

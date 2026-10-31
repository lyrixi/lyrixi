import React, { forwardRef, type MouseEvent } from 'react'
import Combo from './../components/Combo'

import type { ToolBarComboRef } from './../types/ToolBar.common.types'
import type { ToolBarActionSheetComboRenderParams, ToolBarActionSheetProps } from './../types'

// 内库使用-start
import ActionSheet from './../../ActionSheet'
// 内库使用-end

/* 测试使用-start
import { ActionSheet } from 'lyrixi-mobile'
测试使用-end */

// 操作表下拉
const ToolBarActionSheet = forwardRef<
  { close: () => void; open: () => void },
  ToolBarActionSheetProps
>(
  (
    {
      // Value & Display Value
      value,
      placeholder = '',

      // Style
      direction,
      block,
      color = 'default',
      variant = 'text',
      size,
      square,
      radius = 'm',
      style,
      className,

      maskStyle,
      maskClassName,
      modalStyle,
      modalClassName,

      // Elements
      comboRender,
      children,
      arrowRender,
      arrowSvg,
      portal,
      list,

      // Events
      onBeforeOpen,
      onOpen,
      onClose,
      onChange,
      ...rest
    },
    ref
  ) => {
    // 修改
    function handleChange(
      newValue: Parameters<NonNullable<ToolBarActionSheetProps['onChange']>>[0]
    ) {
      onChange?.(newValue)
    }

    // 获取标题节点
    function renderCombo({ comboRef, open, onClick }: ToolBarActionSheetComboRenderParams) {
      if (typeof comboRender === 'function') {
        return comboRender({
          comboRef,
          open,
          onClick
        })
      }
      return (
        <Combo
          ref={comboRef as React.RefObject<ToolBarComboRef>}
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
          radius={radius}
          size={size}
          // Elements
          arrowRender={arrowRender}
          arrowSvg={arrowSvg}
          // Events
          onClick={(e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation()
            onClick?.(e)
          }}
        >
          {/* comboChildren */}
          {children || value?.name || placeholder}
        </Combo>
      )
    }

    return (
      <ActionSheet.Combo
        ref={ref}
        // Value & Display Value
        value={value}
        list={list}
        // Style
        maskStyle={maskStyle}
        maskClassName={maskClassName}
        modalStyle={modalStyle}
        modalClassName={modalClassName}
        // Elements
        portal={portal}
        comboRender={renderCombo}
        // Events
        onBeforeOpen={onBeforeOpen}
        onOpen={onOpen}
        onClose={onClose}
        onChange={handleChange}
        {...rest}
      />
    )
  }
)

export default ToolBarActionSheet

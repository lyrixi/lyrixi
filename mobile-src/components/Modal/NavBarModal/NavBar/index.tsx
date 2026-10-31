import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import Cancel from './Cancel'
import Ok from './Ok'

import type {
  ModalNavBarModalNavBarProps,
  ModalNavBarModalNavBarRef
} from './Modal.NavBarModal.NavBar.types'

// 内库使用-start
import NavBar from './../../../NavBar'
// 内库使用-end

/* 测试使用-start
import { NavBar } from 'lyrixi-mobile'
测试使用-end */

const Head = forwardRef<ModalNavBarModalNavBarRef, ModalNavBarModalNavBarProps>(
  (
    {
      // Value & Display Value
      id,
      // Style
      style,
      className,

      // Elements
      title,
      ok,
      okVisible,
      okPlacement = 'right',
      cancel,
      cancelVisible = true,
      cancelPlacement = 'left',

      // Events
      onOk,
      onCancel
    },
    ref
  ) => {
    const barRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => ({
      get element() {
        return barRef.current
      }
    }))

    let CancelNode = cancelVisible ? (
      <Cancel id={id ? `${id}-cancel` : undefined} onClick={onCancel}>
        {cancel}
      </Cancel>
    ) : null

    let OkNode = okVisible ? (
      <Ok id={id ? `${id}-ok` : undefined} onClick={onOk}>
        {ok}
      </Ok>
    ) : null

    return (
      <NavBar
        ref={barRef}
        style={style}
        className={className}
        title={title}
        leftRender={() => (
          <>
            {cancelPlacement === 'left' && CancelNode}
            {okPlacement === 'left' && OkNode}
          </>
        )}
        rightRender={() => (
          <>
            {cancelPlacement === 'right' && CancelNode}
            {okPlacement === 'right' && OkNode}
          </>
        )}
      />
    )
  }
)
export default Head

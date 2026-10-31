import React, { type MouseEvent } from 'react'

import type { ModalNavBarModalOkProps } from './Modal.NavBarModal.Ok.types'

// 内库使用-start
import NavBar from './../../../NavBar'
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { NavBar, LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

const Ok = ({ id, total, children, onClick }: ModalNavBarModalOkProps) => {
  // 点击确定
  function handleOkClick(e: MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    if (onClick) onClick(e)
  }

  return (
    <NavBar.Button id={id} color="primary" onClick={handleOkClick}>
      {children || LocaleUtil.locale('确定', 'lyrixi_38cf16f2204ffab8a6e0187070558721')}
      {typeof total === 'number' && `(${total})`}
    </NavBar.Button>
  )
}

export default Ok

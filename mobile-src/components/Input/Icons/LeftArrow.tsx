import React, { forwardRef } from 'react'

import type { InputIconProps, InputIconRef } from '../types/Input.Icon.types'

// 内库使用-start
import Icons from '../../../icons'
import InputIcon from './../Icon'
// 内库使用-end

/* 测试使用-start
import { Icons } from 'lyrixi-mobile'
import InputIcon from './../Icon'
测试使用-end */

const IconLeftArrow = forwardRef<
  InputIconRef,
  Omit<InputIconProps, 'svg'> & Pick<Partial<InputIconProps>, 'svg'>
>(({ svg = Icons.ArrowLeft, ...rest }, ref) => {
  return <InputIcon ref={ref} svg={svg} {...rest} />
})

export default IconLeftArrow

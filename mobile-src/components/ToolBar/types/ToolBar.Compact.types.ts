import type { ReactNode } from 'react'

// 内库使用-start
import type { FlexProps, FlexRef } from '../../Flex/types'
import type { Radius } from './../../../utils/VariablesUtil/types'
// 内库使用-end

/* 测试使用-start
import type { FlexProps, FlexRef, Radius } from 'lyrixi-mobile'
测试使用-end */

export type ToolBarCompactRef = FlexRef

export interface ToolBarCompactProps extends FlexProps {
  // Value & Display Value
  separator?: ReactNode | boolean
  radius?: Radius | string
}

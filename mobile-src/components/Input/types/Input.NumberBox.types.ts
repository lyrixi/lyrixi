import type { RefObject } from 'react'
import type { CSSProperties, ReactNode } from 'react'

import type { InputTextProps, InputTextRef } from './Input.Text.types'

// 数值步进框：在 `Input.Text` 上增加加减区与步进焦点等。
export interface InputNumberBoxProps extends InputTextProps {
  // Value & Display Value
  id?: string

  step?: number
  stepFocus?: boolean
  plusClassName?: string
  plusStyle?: CSSProperties
  minusClassName?: string
  minusStyle?: CSSProperties
  children?: ReactNode
}

export interface InputNumberBoxRef extends InputTextRef {
  getInputRef: () => RefObject<InputTextRef | null>
}

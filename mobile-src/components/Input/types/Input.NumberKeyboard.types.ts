import type { ReactNode } from 'react'

import type { InputTextProps, InputTextRef } from './Input.Text.types'

// 数字键盘：展示层为 Text，受控值为字符串数字片段。
export interface InputNumberKeyboardProps extends InputTextProps {
  ok?: ReactNode | null
}

export type InputNumberKeyboardRef = InputTextRef

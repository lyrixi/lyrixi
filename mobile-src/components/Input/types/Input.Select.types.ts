import type { CSSProperties, MouseEvent, ReactNode } from 'react'

import type { InputNodeProps, InputNodeValue } from './Input.Node.types'
import type { ListItem } from '../../List/types'

// 与 `InputNodeValue` 对齐：选择类控件受控值。
export type InputSelectValue = InputNodeValue

export interface InputSelectRef {
  displayValue: string
  getDisplayValue: (newValue?: InputSelectValue) => string
  element: HTMLElement | null
}

/**
 * Select.Combo / Tags 等：继承 `InputNodeProps` 并补充 name、组合展示等；
 * `onChange` / `value` 按选择场景收窄。
 */
export interface InputSelectProps extends Omit<InputNodeProps, 'onChange' | 'onClick'> {
  // Value & Display Value
  id?: string

  name?: string
  value?: InputSelectValue
  formatter?: (value: InputSelectValue, options?: { separator?: string }) => string
  onChange?: (value: InputSelectValue, options?: unknown) => void
  autoFocus?: boolean
  autoSelect?: boolean
  compositionEndEnabled?: boolean
  onPreview?: (value: string) => Promise<boolean | undefined> | boolean | undefined
  onSearch?: (value: string) => void
  step?: number
  iconRender?: (options: { className: string; style?: CSSProperties }) => ReactNode
  mode?: 'tags' | undefined
  autoSize?: boolean
  separator?: string
  // Events：点击空白/添加无第二参；点击标签编辑时带 { tag }
  onClick?: (e: MouseEvent<HTMLDivElement>, options?: { tag: ListItem }) => void
}

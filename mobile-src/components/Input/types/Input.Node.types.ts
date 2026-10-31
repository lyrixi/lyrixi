import type {
  ComponentType,
  CSSProperties,
  MouseEvent,
  ReactNode,
  SVGProps,
  TouchEvent
} from 'react'

import type { InputSize } from './Input.Size.types'
import type { ListItem } from '../../List/types'

/**
 * 选择类控件受控值：对象、日期及其数组等。
 * 不包含 ReactNode/DOM；`undefined` 表示未传受控值。
 */
export type InputNodeValue =
  | number
  | string
  | null
  | Date
  | (Date | null | string | number)[]
  | ListItem
  | ListItem[]

// Node（div 展示层）对外 ref。
export interface InputNodeRef {
  element: HTMLDivElement | null
  inputElement: HTMLDivElement | null
}

export interface InputNodeProps {
  id?: string
  children?: ReactNode
  placeholder?: string
  // Status
  readOnly?: boolean
  disabled?: boolean
  allowClear?: boolean
  autoSize?: boolean
  // Style
  size?: InputSize
  style?: CSSProperties
  className?: string
  // Elements
  leftIconRender?: () => ReactNode
  leftIconSvg?: ComponentType<SVGProps<SVGSVGElement>>
  rightIconRender?: () => ReactNode
  rightIconSvg?: ComponentType<SVGProps<SVGSVGElement>>
  clearRender?: (options: {
    clearable: boolean
    allowClear?: boolean
    onClear: (e?: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => void
    onTouchStart?: (e?: TouchEvent<HTMLElement>) => void
  }) => ReactNode | undefined
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  // Events
  onChange?: (value: null, options?: { action: string }) => void
}

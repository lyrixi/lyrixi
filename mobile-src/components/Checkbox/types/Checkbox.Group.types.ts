import type { CSSProperties } from 'react'

import type { CheckboxItem } from './Checkbox.common.types'
import type { CheckboxProps } from './Checkbox.types'

export interface CheckboxGroupRef {
  element: HTMLDivElement | null
}

export interface CheckboxGroupProps {
  // Value & Display Value
  id?: string
  value?: unknown
  list?: CheckboxItem[]
  placeholder?: string
  // Status
  disabled?: boolean
  readOnly?: boolean
  allowClear?: boolean
  multiple?: boolean
  // Style
  className?: string
  style?: CSSProperties
  // Elements
  iconRender?: CheckboxProps['iconRender']
  iconPlacement?: CheckboxProps['iconPlacement']
  // Events
  onChange?: (value: CheckboxItem | CheckboxItem[] | null) => void
}

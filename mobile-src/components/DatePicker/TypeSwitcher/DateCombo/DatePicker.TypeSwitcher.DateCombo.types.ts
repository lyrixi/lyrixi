import type { CSSProperties, MouseEvent, ReactNode } from 'react'

import type { DatePickerComboRef } from '../../types/DatePicker.Combo.types'
import type { DatePickerPickerType } from '../../types/DatePicker.common.types'

// TypeSwitcher/DateCombo/Combo 展示层
export type DatePickerTypeSwitcherDateComboComboProps = {
  id?: string
  value?: Date | null
  type?: DatePickerPickerType | string
  style?: CSSProperties
  className?: string
  children?: ReactNode
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

// TypeSwitcher/DateCombo/index 外层字段 props
export type DatePickerTypeSwitcherDateComboProps = {
  id?: string
  value?: Date | null
  type: string
  min?: Date | null
  max?: Date | null
  disabled?: boolean
  style?: CSSProperties
  className?: string
  onChange?: (value: Date) => void
}

export type DatePickerTypeSwitcherDateComboRef = DatePickerComboRef

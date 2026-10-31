import type { CSSProperties, MouseEvent } from 'react'

import type { DatePickerWeekComboRef } from '../../types/DatePicker.WeekCombo.types'

// TypeSwitcher/WeekCombo/Combo 展示层
export type DatePickerTypeSwitcherWeekComboComboProps = {
  id?: string
  value?: Date | null
  style?: CSSProperties
  className?: string
  children?: React.ReactNode
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

// TypeSwitcher/WeekCombo/index 外层字段 props
export type DatePickerTypeSwitcherWeekComboProps = {
  id?: string
  value?: Date | null
  min?: Date | null
  max?: Date | null
  disabled?: boolean
  style?: React.CSSProperties
  className?: string
  onChange?: (value: Date) => void
}

export type DatePickerTypeSwitcherWeekComboRef = DatePickerWeekComboRef

import type { DatePickerTypeSwitcherValue } from 'lyrixi-mobile'

export type HeaderProps = {
  dateType: DatePickerTypeSwitcherValue | null
  onDateTypeChange: (dateType: DatePickerTypeSwitcherValue) => void
}

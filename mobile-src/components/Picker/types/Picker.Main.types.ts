import type { CSSProperties } from 'react'

import type { PickerItem } from './Picker.common.types'

export interface PickerMainProps {
  // Modal: Status
  open?: boolean
  allowClear?: boolean
  // Value & Display Value
  id?: string
  value?: PickerItem[] | null
  list?: PickerItem[] | PickerItem[][]
  // Style
  style?: CSSProperties
  className?: string
  // Events
  onChange?: (value: PickerItem[]) => void
}

export interface PickerMainRef {
  mainElement: HTMLDivElement | null
  getMainElement: () => HTMLDivElement | null
  getValue: () => PickerItem[] | null
  update: () => void
}

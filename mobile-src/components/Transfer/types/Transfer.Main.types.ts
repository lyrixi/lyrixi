import type { CSSProperties } from 'react'

import type { TransferItem, TransferTitles } from './Transfer.common.types'

export interface TransferMainRef {
  mainElement: HTMLDivElement | null
  getMainElement: () => HTMLDivElement | null
}

export interface TransferMainProps {
  // Value & Display Value
  id?: string
  value: TransferItem[]
  list: TransferItem[]
  titles?: TransferTitles
  // Status
  open?: boolean
  allowClear?: boolean
  // Style
  className?: string
  style?: CSSProperties
  // Events
  onChange?: (value: TransferItem[]) => void
}

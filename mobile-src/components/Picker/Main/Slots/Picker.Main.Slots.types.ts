import type { PickerItem } from '../../types/Picker.common.types'

export interface PickerMainSlotsProps {
  // Value & Display Value
  lists?: PickerItem[][]
  value?: PickerItem[] | null
  cellHeight?: number
  // Events
  onScrollEnd?: (options: { slotIndex: string | number; rowIndex: number }) => void
}

export interface PickerMainSlotsRef {
  rootElement: HTMLDivElement | null
  update: () => void
}

export interface PickerMainSlotsTouchDragState {
  startX: number
  startY: number
  currentX: number
  currentY: number
  endX: number
  endY: number
  startTimeStamp: number
  duration: number
  diffX: number
  diffY: number
  posY: number
  currentPosY: number
  direction: string | null
}

export interface PickerMainSlotsSlotDragState {
  slotElement: HTMLUListElement | null
  slotIndex: string | null
  slotHeight: number
}

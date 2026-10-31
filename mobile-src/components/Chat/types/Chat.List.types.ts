import type { ChatItem } from './Chat.common.types'

export interface ChatListRef {
  element: HTMLDivElement | null
}

export interface ChatListProps {
  // Value & Display Value
  id?: string
  value?: ChatItem[]
  list?: ChatItem[]
  formatViewItem?: (item: ChatItem, options: { index: number }) => ChatItem
  // Status
  checkable?: boolean
  // Style
  checkboxVariant?: string
  checkboxPlacement?: string
  // Elements
  timeSeparator?: number
  // Events
  onChange?: (value: ChatItem[]) => void
}

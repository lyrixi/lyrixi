export type ChatPlacement = 'left' | 'right'

export interface ChatItem {
  id?: string | number
  placement?: ChatPlacement
  avatarUrl?: string
  avatarRender?: unknown
  authorRender?: unknown
  content?: unknown
  name?: string
  time?: Date
  _raw?: ChatItem
  [key: string]: unknown
}

export interface ChatViewItem extends ChatItem {
  _raw: ChatItem
}

export interface ChatViewFormatterParams {
  formatViewItem?: (item: ChatItem, options: { index: number }) => ChatItem
}

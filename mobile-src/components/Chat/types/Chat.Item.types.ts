import type { CSSProperties, ReactNode } from 'react'

import type { ChatPlacement } from './Chat.common.types'

export interface ChatItemRef {
  element: HTMLDivElement | null
}

export interface ChatItemProps {
  // Value & Display Value
  id?: string | number
  _raw?: Record<string, unknown>
  // Status
  checked?: boolean
  checkable?: boolean
  // Style
  className?: string
  placement?: ChatPlacement
  style?: CSSProperties
  checkboxVariant?: string
  checkboxPlacement?: string
  // Elements
  avatarUrl?: string
  avatarRender?: (options: { checked?: boolean; [key: string]: unknown }) => ReactNode
  authorRender?: (options: { checked?: boolean; [key: string]: unknown }) => ReactNode
  content?: ReactNode
  onChange?: (checked: boolean) => void
}

import type { ReactNode } from 'react'

export interface ListInfiniteScrollProps {
  // Value & Display Value
  id?: string

  // Status
  status?: string
  // Elements
  content?: ReactNode
}

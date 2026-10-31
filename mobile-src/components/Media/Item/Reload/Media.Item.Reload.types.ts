import type { MouseEvent } from 'react'

export interface MediaItemReloadProps {
  // Value & Display Value
  id?: string

  // Events
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

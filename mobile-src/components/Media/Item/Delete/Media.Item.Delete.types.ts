import type { MouseEvent } from 'react'

export interface MediaItemDeleteProps {
  // Value & Display Value
  id?: string

  // Events
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

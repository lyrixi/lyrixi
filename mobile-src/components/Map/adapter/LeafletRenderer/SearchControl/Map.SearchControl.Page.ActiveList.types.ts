import type { FC } from 'react'

export interface MapSearchControlPageActiveListProps {
  // Value & Display Value
  value?: string
  // Status
  allowClear?: boolean
  // Events
  onSearch?: (kw: string) => void
  onCancel?: () => void
}

export type MapSearchControlPageActiveListComponent = FC<MapSearchControlPageActiveListProps>

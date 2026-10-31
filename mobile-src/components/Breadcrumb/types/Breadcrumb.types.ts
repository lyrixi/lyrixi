import type { CSSProperties, ReactNode } from 'react'

import type { BreadcrumbItem } from './Breadcrumb.common.types'
import type { BreadcrumbSize } from './Breadcrumb.Size.types'

export interface BreadcrumbProps {
  // Value & Display Value
  id?: string
  value?: BreadcrumbItem
  list?: BreadcrumbItem[]
  separator?: ReactNode
  gap?: number
  descriptionPlacement?: string
  // Status
  disabled?: boolean
  // Style
  size?: BreadcrumbSize
  block?: boolean
  style?: CSSProperties
  className?: string
  itemStyle?: CSSProperties
  itemClassName?: string
  // Events
  onChange?: (item: BreadcrumbItem) => void
}

export interface BreadcrumbRef {
  element: HTMLDivElement | null
}

import type { CSSProperties, MouseEvent, ReactNode } from 'react'

import type { InputSize } from '../../types/Input.Size.types'

export interface InputSelectTagProps {
  // Value & Display Value
  id?: string
  name?: ReactNode
  // Status
  readOnly?: boolean
  disabled?: boolean
  allowClear?: boolean
  // Style
  style?: CSSProperties
  className?: string
  size?: InputSize
  // Events
  onEdit?: (e: MouseEvent<HTMLDivElement>) => void
  onDelete?: () => void
}

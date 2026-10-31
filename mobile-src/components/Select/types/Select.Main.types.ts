import type { CSSProperties } from 'react'

import type { SelectListProps } from './Select.common.types'

export interface SelectMainProps extends SelectListProps {
  // Value & Display Value
  id?: string

  className?: string
  style?: CSSProperties
}

export interface SelectMainRef {
  mainElement: HTMLDivElement | null
  getMainElement: () => HTMLDivElement | null
}

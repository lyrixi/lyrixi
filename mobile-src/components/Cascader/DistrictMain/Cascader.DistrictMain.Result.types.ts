import type { CSSProperties } from 'react'

import type { DistrictResultState } from '../types/Cascader.DistrictMain.api.types'

export interface CascaderDistrictMainResultProps {
  // Value & Display Value
  result?: DistrictResultState
  // Style
  style?: CSSProperties
  className?: string
  // Events
  onReload?: () => void
}

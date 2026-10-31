import type { CSSProperties, ForwardRefExoticComponent, RefAttributes } from 'react'

import type { InputTextRef } from '../../../../Input/types'

// ToolBar.Search 在地图搜索条上的窄化 props（与 forwardRef 断言一致）
export type MapSearchBarForwardedProps = {
  readOnly?: boolean
  className?: string
  style?: CSSProperties
  onClick?: () => void
} & RefAttributes<InputTextRef>

export type MapSearchBarExoticComponent = ForwardRefExoticComponent<MapSearchBarForwardedProps>

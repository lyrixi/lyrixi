import type { MouseEvent } from 'react'

import type { ToolBarFilterProps } from 'lyrixi-mobile'

export type { ToolBarFilterProps }

export type FilterHeaderProps = {
  queryParams?: Record<string, unknown>
  onSearch?: (p: Record<string, unknown>) => void
}

export type ToolBarFilterModalRenderParams = {
  open: boolean | null
  onClose: () => void
}

export type ToolBarFilterFooterRenderParams = {
  onClose?: (e?: MouseEvent<HTMLDivElement>) => void
}

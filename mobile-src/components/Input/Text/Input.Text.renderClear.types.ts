import type { MouseEvent, ReactNode, TouchEvent } from 'react'

export interface InputTextRenderClearParams {
  id?: string
  clearRender?: (options: {
    clearable: boolean
    allowClear?: boolean
    onClear: (e?: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => void
    onTouchStart?: (e?: TouchEvent<HTMLElement>) => void
  }) => ReactNode | undefined
  allowClear?: boolean
  clearable?: boolean
  onClear: (e?: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => void
  onTouchStart?: (e?: TouchEvent<HTMLElement>) => void
}

import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

export interface InputDisplayValueProps {
  id?: string
  children?: ReactNode
  style?: CSSProperties
  /** 基础 className，组件会自动追加 `lyrixi-hide` */
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

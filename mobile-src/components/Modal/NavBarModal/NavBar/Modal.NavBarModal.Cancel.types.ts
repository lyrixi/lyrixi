import type { MouseEvent, ReactNode } from 'react'

export interface ModalNavBarModalCancelProps {
  id?: string
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  children?: ReactNode
}

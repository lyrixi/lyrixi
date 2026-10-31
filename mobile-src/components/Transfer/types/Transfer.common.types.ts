import type { ReactNode } from 'react'

export interface TransferItem {
  id: string | number
  name?: ReactNode
  [key: string]: unknown
}

export interface TransferTitles {
  source?: ReactNode
  target?: ReactNode
}

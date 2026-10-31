import type { MapPointCheckHandler } from '../../../types/Map.common.types'

export interface CircleParams {
  radius?: number
  color?: string
  onCheck?: MapPointCheckHandler | null
  [key: string]: unknown
}

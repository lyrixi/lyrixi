import { DEFAULT_LOADING_ID } from './constants'

// Loading是否存在
export default function existsLoading(): boolean {
  const modal = document.getElementById(DEFAULT_LOADING_ID)
  if (modal) return true
  return false
}

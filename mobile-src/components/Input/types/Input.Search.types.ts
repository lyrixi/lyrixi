import type { InputTextProps, InputTextRef } from './Input.Text.types'

// 搜索框：在 `Input.Text` 上增加 `onSearch`。
export interface InputSearchProps extends InputTextProps {
  // Value & Display Value
  id?: string

  // Status
  /** `onChange` 防抖延迟（毫秒）；未设置或 ≤0 时不防抖 */
  debounceDelay?: number

  onSearch?: (value: string) => void
}

export type InputSearchRef = InputTextRef

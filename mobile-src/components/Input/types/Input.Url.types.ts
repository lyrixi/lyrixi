import type { InputTextProps, InputTextRef } from './Input.Text.types'

// URL 输入：在 `Input.Text` 上增加 `onPreview`。
export interface InputUrlProps extends InputTextProps {
  // Value & Display Value
  id?: string

  onPreview?: (value: string) => Promise<boolean | undefined> | boolean | undefined
}

export type InputUrlRef = InputTextRef

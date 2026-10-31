import type { CSSProperties, ReactNode } from 'react'

import type { FieldValidator } from './Form.common.types'

export interface FormFieldProps {
  name: string
  children?: ReactNode
  validator?: FieldValidator
  valueName?: string
  changeName?: string
  span?: number | 'auto'
  style?: CSSProperties
  className?: string
}

import type { CSSProperties, ReactNode } from 'react'

import type { FieldData, FormSpanConfig } from './Form.common.types'

export interface FormProps {
  children?: ReactNode
  label?: FormSpanConfig
  content?: FormSpanConfig
  style?: CSSProperties
  className?: string
  onFieldsChange?: (changedFields: FieldData[], allFields: FieldData[]) => void
}

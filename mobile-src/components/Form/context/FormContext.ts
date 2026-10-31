import { createContext } from 'react'

import type { FieldValidator, FormSpanConfig } from '../types'

// Field 挂到 Form 上的实体：Form 通过它读写值、跑校验
export interface FieldEntity {
  getValue: () => unknown
  setValue: (value: unknown) => void
  validator?: FieldValidator
}

export interface FormContextValue {
  // 注册 / 注销字段
  register: (name: string, field: FieldEntity) => void
  unregister: (name: string) => void
  // 布局配置（透传 Form 的 label / content，后续可继续加字段）
  label?: FormSpanConfig
  content?: FormSpanConfig
  // 字段值变化时通知 Form（对应 Form.onFieldsChange）
  onFieldChange: (name: string, value: unknown) => void
}

const FormContext = createContext<FormContextValue | null>(null)

export default FormContext

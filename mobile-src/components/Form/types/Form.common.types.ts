export interface FieldData {
  name: string
  value: unknown
  errors: string[]
}

// Form ref 暴露的方法（通过 ref={formRef} 调用）
export interface FormRef {
  element: HTMLDivElement | null
  getFieldValue(name: string): unknown
  getFieldsValue(nameList?: string[]): Record<string, unknown>
  setFieldsValue(values: Record<string, unknown>): void
  validateFields(nameList?: string[]): Promise<Record<string, unknown>>
  /** 滚动到指定字段 */
  scrollToField(name: string): void
}

export type FieldValidator = (value: unknown) => Promise<void>

export interface FormSpanConfig {
  span?: number | 'auto'
}

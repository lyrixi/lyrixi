// Picker Main / Modal / Combo 共用的列项
export interface PickerItem {
  id: string | number
  name: string
  [key: string]: unknown
}

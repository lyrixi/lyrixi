// DatePicker 跨子模块共享类型
import type { ReactElement, ReactNode } from 'react'

import type { ListItem } from '../../List/types'

export type DatePickerPickerType =
  | 'year'
  | 'quarter'
  | 'month'
  | 'date'
  | 'time'
  | 'datetime'
  | 'week'

// 快捷区间：键为展示名，值为日期对或 0 表示“自定义”占位
export type DatePickerRangesMap = Record<string, [Date, Date] | 0 | unknown>

// 多选 Tab 项（MultipleCombo 使用 Input.Select，与 TabBar 项结构兼容）
export interface DatePickerMultipleItem extends Omit<ListItem, 'id' | 'name' | 'disabled'> {
  id?: string | number
  name?: string
  description?: ReactNode
  value?: Date | null
  disabled?: boolean
}

export type DatePickerMultipleValue = DatePickerMultipleItem[] | null

export type DatePickerTabBarValue = { id?: string | number }

// 区间 onChange 第二参（RangeCombo / RangeMain 等）
export interface DatePickerRangeChangeMeta {
  rangeId?: string | null
  ranges?: DatePickerRangesMap
  displayValue?: string
}

// DatePicker 内联 Picker 单列选项
export interface DatePickerPickerListItem {
  id: number
  /** LocaleUtil.locale 可能返回 string 或带占位节点 */
  name: number | string | ReactNode | ReactElement
}

export type DatePickerPickerValueList = DatePickerPickerListItem[]

// getTitle 第二参
export interface DatePickerGetTitleParams {
  type?: DatePickerPickerType | string
  separator?: string
}

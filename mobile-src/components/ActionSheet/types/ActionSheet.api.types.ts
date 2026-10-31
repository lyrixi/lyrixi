import type { ActionSheetModalProps } from './ActionSheet.Modal.types'

export type ActionSheetOpenProps = Omit<ActionSheetModalProps, 'open'>

export interface ActionSheetCloseParams {
  /** 是否播放关闭动画，默认 true */
  animated?: boolean
}

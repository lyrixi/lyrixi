import type { ToolBarComboProps } from '../components/ToolBar.Combo.types'

// 内库使用-start
import type { ActionSheetComboProps } from '../../ActionSheet/types'
// 内库使用-end

export interface ToolBarActionSheetProps
  extends ActionSheetComboProps,
    Omit<ToolBarComboProps, 'onClick'> {}

export type ToolBarActionSheetComboRenderParams = Parameters<
  NonNullable<ToolBarActionSheetProps['comboRender']>
>[0]

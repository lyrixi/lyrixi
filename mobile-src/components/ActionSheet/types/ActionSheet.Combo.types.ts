import type {
  ComponentType,
  CSSProperties,
  MouseEvent,
  ReactNode,
  RefObject,
  SVGProps
} from 'react'

import type { ComboRef } from '../../Combo/types'
import type { ListItem } from '../../List/types'
import type { ModalProps } from '../../Modal/types'

export interface ActionSheetComboRef {
  close: () => void
  open: () => void
}

export interface ActionSheetComboProps {
  // Value & Display Value
  id?: string

  // Combo: Value & Display Value
  value?: ListItem | null
  placeholder?: string
  formatter?: (...args: unknown[]) => string
  autoSize?: boolean
  separator?: string
  mode?: 'tags' | undefined
  // Combo: Status
  readOnly?: boolean
  disabled?: boolean
  allowClear?: boolean
  // Combo: Style
  style?: CSSProperties
  className?: string
  // Combo: Elements
  comboRender?: (options: {
    comboRef: RefObject<ComboRef | null>
    open: boolean
    onClick: (e: MouseEvent<HTMLDivElement>) => void
  }) => ReactNode
  children?: ReactNode
  leftIconRender?: () => ReactNode
  leftIconSvg?: ComponentType<SVGProps<SVGSVGElement>>
  rightIconRender?: () => ReactNode
  rightIconSvg?: ComponentType<SVGProps<SVGSVGElement>>
  clearRender?: () => ReactNode
  // Modal: Value & Display Value
  list?: ListItem[]
  // Modal: Status
  maskClosable?: boolean
  // Modal: Style
  safeArea?: boolean
  modalStyle?: CSSProperties
  modalClassName?: string
  maskStyle?: CSSProperties
  maskClassName?: string
  // Modal: Elements
  portal?: ModalProps['portal']
  title?: ReactNode
  cancel?: ReactNode
  cancelVisible?: boolean
  itemRender?: (item: ListItem, options: { onChange: (item: ListItem) => void }) => ReactNode
  // Events
  onBeforeOpen?: () => Promise<boolean | void>
  onOpen?: () => void
  onClose?: () => void
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  onChange?: (value: ListItem | null) => void
}

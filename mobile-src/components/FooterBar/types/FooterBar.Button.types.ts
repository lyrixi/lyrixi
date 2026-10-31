import type { CSSProperties, ForwardRefExoticComponent, RefAttributes } from 'react'

// 内库使用-start
import type { ButtonProps } from '../../Button/types'
import type { ListItem } from '../../List/types'
import type { ModalProps } from '../../Modal/types'
// 内库使用-end

export interface FooterBarButtonRef {
  element: HTMLDivElement | null
}

export interface FooterBarButtonProps extends Omit<ButtonProps, 'onClick'> {
  // Value & Display Value
  id?: string

  list?: ListItem[]
  modalStyle?: CSSProperties
  modalClassName?: string
  maskStyle?: CSSProperties
  maskClassName?: string
  portal?: ModalProps['portal']

  // Events
  onClick?: ButtonProps['onClick']
  /** list 弹出的 ActionSheet 选中项 */
  onChange?: (item: ListItem) => void
}

export type FooterBarButtonComponents = ForwardRefExoticComponent<
  FooterBarButtonProps & RefAttributes<FooterBarButtonRef>
>

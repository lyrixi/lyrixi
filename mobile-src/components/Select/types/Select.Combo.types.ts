import type { SelectModalProps } from './Select.Modal.types'

// 内库使用-start
import type { InputSelectRef, InputSelectProps } from '../../Input/types'
import type { ModalRef } from '../../Modal/types'
// 内库使用-end

export type SelectComboProps = Omit<InputSelectProps, 'value' | 'onChange'> &
  Pick<
    SelectModalProps,
    | 'value'
    | 'list'
    | 'formatViewItem'
    | 'multiple'
    | 'checkable'
    | 'maskClosable'
    | 'safeArea'
    | 'modalStyle'
    | 'modalClassName'
    | 'maskStyle'
    | 'maskClassName'
    | 'portal'
    | 'title'
    | 'cancel'
    | 'cancelVisible'
    | 'headerRender'
    | 'itemStyle'
    | 'itemClassName'
    | 'itemLayout'
    | 'checkboxVariant'
    | 'checkboxPlacement'
    | 'itemRender'
    | 'onOk'
    | 'onChange'
  > & {
    onBeforeOpen?: () => boolean | void | Promise<boolean | void>
  }

export type SelectComboRef = InputSelectRef &
  ModalRef & {
    close: () => void
    open: () => void
  }

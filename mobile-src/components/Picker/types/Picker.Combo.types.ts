import type { PickerItem } from './Picker.common.types'
import type { PickerModalProps, PickerModalRef } from './Picker.Modal.types'

// 内库使用-start
import type { InputSelectProps, InputSelectRef } from '../../Input/types'
// 内库使用-end

export type PickerComboProps = Omit<InputSelectProps, 'value' | 'onChange' | 'formatter'> &
  Pick<
    PickerModalProps,
    | 'value'
    | 'list'
    | 'onChange'
    | 'maskClosable'
    | 'safeArea'
    | 'modalStyle'
    | 'modalClassName'
    | 'maskStyle'
    | 'maskClassName'
    | 'portal'
    | 'title'
    | 'ok'
    | 'cancel'
    | 'okVisible'
    | 'cancelVisible'
  > & {
    formatter?: (value: PickerItem[] | null, options?: { separator?: string }) => string
    onBeforeOpen?: () => boolean | void | Promise<boolean | void>
  }

export type PickerComboRef = InputSelectRef &
  PickerModalRef & {
    close: () => void
    open: () => void
  }

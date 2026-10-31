import type { TransferItem } from './Transfer.common.types'
import type { TransferModalProps, TransferModalRef } from './Transfer.Modal.types'

// 内库使用-start
import type { InputSelectProps, InputSelectRef } from '../../Input/types'
// 内库使用-end

type TransferComboField = Omit<InputSelectProps, 'onChange' | 'value'>

// Combo + Modal 组合
export type TransferComboProps = TransferComboField &
  Omit<TransferModalProps, 'value' | 'onChange'> & {
    value?: TransferItem[]
    list?: TransferItem[]
    onChange?: (value: TransferItem[]) => void
    onBeforeOpen?: () => boolean | void | Promise<boolean | void>
  }

export type TransferComboRef = InputSelectRef &
  TransferModalRef & {
    close: () => void
    open: () => void
  }

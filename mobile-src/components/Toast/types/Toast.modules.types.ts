import Toast from '../Toast'
import open from '../api/open'
import close from '../api/close'

import type { ToastProps } from './Toast.types'

export type ToastComponents = typeof Toast & {
  defaultProps?: ToastProps
  open: typeof open
  close: typeof close
}

import _Toast from './Toast'
import open from './api/open'
import close from './api/close'

import type { ToastComponents } from './types/Toast.modules.types'
import type { ToastProps } from './types'

const Toast = _Toast as ToastComponents

Toast.open = (props?: ToastProps) => open({ ...(Toast.defaultProps || {}), ...(props || {}) })
Toast.close = close

export default Toast

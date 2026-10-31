// 内库使用-start
import type { Root } from '../../../utils/ReactDOMClientCompat'
// 内库使用-end

export type ActionSheetInstance = {
  root: Root | null
  rootElement: HTMLDivElement | null
}

const actionSheetInstance: ActionSheetInstance = {
  root: null,
  rootElement: null
}

export default actionSheetInstance

// 内库使用-start
import type { Root } from '../../../utils/ReactDOMClientCompat'
// 内库使用-end

export type MessageInstance = {
  root: Root | null
  rootElement: HTMLDivElement | null
}

const messageInstance: MessageInstance = {
  root: null,
  rootElement: null
}

export default messageInstance

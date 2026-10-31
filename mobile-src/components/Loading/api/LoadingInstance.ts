// 内库使用-start
import type { Root } from '../../../utils/ReactDOMClientCompat'
// 内库使用-end

export type LoadingInstanceEntry = {
  root: Root
  rootElement: HTMLDivElement
}

const instances = new Map<string, LoadingInstanceEntry>()

export function getLoadingInstance(id: string): LoadingInstanceEntry | undefined {
  return instances.get(id)
}

export function setLoadingInstance(id: string, entry: LoadingInstanceEntry): void {
  instances.set(id, entry)
}

export function deleteLoadingInstance(id: string): void {
  instances.delete(id)
}

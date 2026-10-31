// 内库使用-start
import type { FileItem } from '../../../../utils/Bridge/types/index'
// 内库使用-end

export interface AttachChooseParams {
  async: boolean
  maxSize?: number
  maxCount?: number
  sourceType: string[]
  list?: FileItem[]
  uploadPlacement: 'start' | 'end' | string
  uploadList: (list: FileItem[], options?: { action?: string }) => Promise<FileItem[] | undefined>
  onChoose?: () => unknown
  onChange?: (list: FileItem[], options: { action: string }) => void
}

// 内库使用-start
import type { FileItem } from '../../../../utils/Bridge/types/index'
// 内库使用-end

export interface MediaChooseUtilParams {
  async: boolean
  maxCount?: number
  list?: FileItem[]
  uploadPlacement: 'start' | 'end' | string
  uploadList: (
    list: FileItem[] | undefined,
    options?: { action?: string }
  ) => Promise<FileItem[] | undefined>
  onChoose?: () => void | FileItem[] | Promise<FileItem[] | void | null | undefined | unknown>
  onChange?: (list: FileItem[], options: { action: string }) => void | Promise<unknown>
}

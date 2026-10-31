import type { MediaCompressConfig, MediaProps, MediaSizeType } from '../../types/Media.types'

// 内库使用-start
import type { FileItem } from '../../../../utils/Bridge/types/index'
// 内库使用-end

export interface MediaFileChooseParams {
  file: HTMLInputElement
  async: boolean
  sizeType?: MediaSizeType[]
  compressConfig?: MediaCompressConfig
  maxCount?: number
  list?: FileItem[]
  uploadPlacement: 'start' | 'end' | string
  uploadList: (
    list: FileItem[] | undefined,
    options?: { action?: string }
  ) => Promise<FileItem[] | undefined>
  onFileChange?: MediaProps['onFileChange']
  onChange?: MediaProps['onChange']
}

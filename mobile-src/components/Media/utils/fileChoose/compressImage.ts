import Compressor from 'compressorjs'

import type { MediaCompressConfig } from '../../types/Media.types'

// 图片压缩
export default function compressImage(
  image: File,
  resultType: 'blob' | 'file' | 'base64' | undefined,
  { quality, maxWidth }: Partial<MediaCompressConfig> = {}
): Promise<Blob | File | string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    new Compressor(image, {
      maxWidth: (maxWidth ?? 1279) as number,
      quality: quality ?? 0.6,
      success(result) {
        if (!resultType || resultType === 'blob') {
          resolve(result)
        } else if (resultType === 'file') {
          const file = new File([result], image.name, { type: image.type })
          resolve(file)
        } else if (resultType === 'base64') {
          const reader = new FileReader()
          reader.readAsDataURL(result)
          reader.onload = () => resolve(reader.result)
          reader.onerror = (error) => reject(error)
        }
      },
      error(err) {
        reject(err)
      }
    })
  })
}

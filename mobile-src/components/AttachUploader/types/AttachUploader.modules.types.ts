import _AttachUploader from '../AttachUploader'

// 内库使用-start
import MediaUploader from '../../MediaUploader'
// 内库使用-end

export type AttachUploaderComponents = typeof _AttachUploader & {
  uploadList: typeof MediaUploader.uploadList
}

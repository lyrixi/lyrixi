import _AttachUploader from './AttachUploader'

import type { AttachUploaderComponents } from './types/AttachUploader.modules.types'

// 内库使用-start
import MediaUploader from './../MediaUploader'
// 内库使用-end

const AttachUploader = _AttachUploader as AttachUploaderComponents

AttachUploader.uploadList = MediaUploader.uploadList

export default AttachUploader

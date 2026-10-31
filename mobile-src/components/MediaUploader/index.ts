import uploadList from './utils/uploadList'
import uploadItem from './utils/uploadItem'
import _MediaUploader from './MediaUploader'

import type { MediaUploaderComponents } from './types/MediaUploader.modules.types'

const MediaUploader = _MediaUploader as MediaUploaderComponents

MediaUploader.uploadList = uploadList
MediaUploader.uploadItem = uploadItem

export default MediaUploader

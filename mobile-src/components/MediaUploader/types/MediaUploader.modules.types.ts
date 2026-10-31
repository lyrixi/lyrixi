import uploadList from '../utils/uploadList'
import uploadItem from '../utils/uploadItem'
import _MediaUploader from '../MediaUploader'

export type MediaUploaderComponents = typeof _MediaUploader & {
  uploadList: typeof uploadList
  uploadItem: typeof uploadItem
}

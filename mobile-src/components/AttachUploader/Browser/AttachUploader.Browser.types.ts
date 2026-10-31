import type { AttachUploaderProps } from '../types/AttachUploader.types'

export type AttachUploaderBrowserProps = Omit<AttachUploaderProps, 'onFileChange' | 'onUpload'>

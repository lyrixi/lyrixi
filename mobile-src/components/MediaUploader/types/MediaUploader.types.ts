import type { MediaUploaderCommonProps } from './MediaUploader.common.types'

export interface MediaUploaderProps extends MediaUploaderCommonProps {
  // Value & Display Value
  id?: string

  platform?: string
  compatible?: boolean | string
  timeout?: number
  chooseExtraParams?: Record<string, unknown>
  onNavigateTo?: (options: Record<string, unknown>) => Promise<boolean | void>
}

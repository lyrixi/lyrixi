import type { MediaUploaderCommonProps } from '../types/MediaUploader.common.types'

export interface MediaUploaderWechatMiniProgramProps extends MediaUploaderCommonProps {
  chooseExtraParams?: Record<string, unknown>
  onNavigateTo?: (options: Record<string, unknown>) => Promise<boolean | void>
}

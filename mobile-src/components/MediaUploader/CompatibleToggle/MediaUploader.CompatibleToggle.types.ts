import type { ReactNode } from 'react'

export interface MediaUploaderCompatibleToggleListItem {
  id: string
  name: ReactNode
}

export interface MediaUploaderCompatibleToggleProps {
  // Value & Display Value
  compatible?: boolean | string
  compatiblePlatform?: string
  // Events
  onCompatiblePlatformChange?: (platform: string) => void
}

import type { ChangeEvent, MouseEvent, ReactNode } from 'react'

export interface AttachChooseProps {
  // Value & Display Value
  sourceType: string[]
  // Status
  disabled?: boolean
  // Style
  className?: string
  // Elements
  uploadRender?: (options: { uploadingType: string }) => ReactNode
  uploadingRender?: (options: { uploadingType: string }) => ReactNode
  // Events
  onBeforeChoose?: (e: MouseEvent<HTMLDivElement>) => boolean | void | Promise<boolean | void>
  onChoose?: (e: MouseEvent<HTMLDivElement>) => void | Promise<unknown>
  onFileChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

import type { ComponentType, CSSProperties, MouseEvent, ReactNode, SVGProps } from 'react'

import type { InputSelectProps } from '../../types/Input.Select.types'
import type { InputSize } from '../../types/Input.Size.types'
import type { ListItem } from '../../../List/types'

export interface InputSelectTagsProps {
  // Value & Display Value
  id?: string
  separator?: string
  placeholder?: string
  value?: ListItem | ListItem[]
  // Status
  readOnly?: boolean
  disabled?: boolean
  allowClear?: boolean
  autoSize?: boolean
  // Style
  className?: string
  style?: CSSProperties
  size?: InputSize
  // Elements
  leftIconRender?: () => ReactNode
  leftIconSvg?: ComponentType<SVGProps<SVGSVGElement>>
  rightIconRender?: () => ReactNode
  rightIconSvg?: ComponentType<SVGProps<SVGSVGElement>>
  clearRender?: InputSelectProps['clearRender']
  // Events
  onAdd?: (e: MouseEvent<HTMLDivElement>) => void
  onEdit?: (e: MouseEvent<HTMLDivElement>, options: { tag: ListItem }) => void
  onChange?: (value: ListItem[], options?: { action: string }) => void
}

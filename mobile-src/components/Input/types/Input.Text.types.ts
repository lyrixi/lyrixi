import type {
  ComponentType,
  CompositionEventHandler,
  CSSProperties,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  SVGProps,
  TouchEvent
} from 'react'

import type { InputSize } from './Input.Size.types'

export type InputMode = 'text' | 'numeric' | 'decimal' | 'tel' | 'email' | 'url' | 'search'

export type InputTextElement = (HTMLInputElement | HTMLTextAreaElement) & {
  composing?: boolean
  preventBlur?: boolean
}

export interface InputTextCorrectValueParams {
  type?: string
  min?: number
  max?: number
  maxLength?: number
  trim?: boolean
  precision?: number
}

export interface InputTextRef {
  element: HTMLDivElement | null
  inputElement: InputTextElement | null
  correctValue: (value: string) => string
  focus: () => void
  blur: () => void
}

export interface InputTextProps {
  id?: string
  name?: string
  type?: string
  inputType?: string
  // Value & Display Value
  value?: string
  placeholder?: string
  formatter?: (value: string) => ReactNode
  // Status
  readOnly?: boolean
  disabled?: boolean
  allowClear?: boolean
  autoFocus?: boolean
  autoSelect?: boolean
  compositionEndEnabled?: boolean
  style?: CSSProperties
  // Style
  size?: InputSize
  className?: string
  // Elements
  leftIconRender?: () => ReactNode
  leftIconSvg?: ComponentType<SVGProps<SVGSVGElement>>
  rightIconRender?: () => ReactNode
  rightIconSvg?: ComponentType<SVGProps<SVGSVGElement>>
  clearRender?: (options: {
    clearable: boolean
    allowClear?: boolean
    onClear: (e?: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => void
    onTouchStart?: (e?: TouchEvent<HTMLElement>) => void
  }) => ReactNode | undefined
  precision?: number
  trim?: boolean
  max?: number
  min?: number
  maxLength?: number
  /** input属性 */
  inputMode?: InputMode
  enterKeyHint?: InputHTMLAttributes<HTMLInputElement>['enterKeyHint']
  autoComplete?: string
  autoCorrect?: string
  spellCheck?: boolean | 'true' | 'false'
  cursor?: boolean | null
  // Events
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  onChange?: (value: string, options?: { action: string }) => void
  onBlur?: (e?: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onFocus?: (e?: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onPressEnter?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onCompositionStart?: CompositionEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onCompositionUpdate?: CompositionEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onCompositionEnd?: CompositionEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

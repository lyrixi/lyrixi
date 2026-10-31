import type { CSSProperties, MouseEvent } from 'react'

import type { MessageBodyProps, MessageButton } from './Message.common.types'

export interface MessageMainRef {
  element: HTMLElement | null
}

export interface MessageMainProps extends MessageBodyProps {
  // Value & Display Value
  id?: string

  className?: string
  style?: CSSProperties
  onButtonClick?: (
    e: MouseEvent<HTMLDivElement>,
    options: { button: MessageButton }
  ) => boolean | void | Promise<boolean | void>
}

import React, { useImperativeHandle, useRef, forwardRef } from 'react'
import type { ComboProps, ComboRef } from './types'

const Combo = forwardRef<ComboRef, ComboProps>(
  (
    {
      // Value & Display Value
      id,
      style,
      className,
      children,
      onClick
    },
    ref
  ) => {
    const comboRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return comboRef.current
        }
      }
    })

    return (
      <div id={id} ref={comboRef} style={style} className={className} onClick={onClick}>
        {children}
      </div>
    )
  }
)

export default Combo

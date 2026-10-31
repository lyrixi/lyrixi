import React, { useImperativeHandle, forwardRef, useRef } from 'react'

import type { PageAsideProps, PageAsideRef } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import SafeArea from './../../SafeArea'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, SafeArea } from 'lyrixi-mobile'
测试使用-end */

const Aside = forwardRef<PageAsideRef, PageAsideProps>(
  (
    {
      // Value & Display Value
      id,
      safeArea,
      className,
      style,
      children
    },
    ref
  ) => {
    const rootRef = useRef<HTMLElement | null>(null)

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    return (
      <aside
        id={id}
        ref={rootRef}
        style={style}
        className={(DOMUtil.classNames as (...args: unknown[]) => string)(
          'lyrixi-page-aside',
          className
        )}
      >
        {children}
        {safeArea === true && <SafeArea />}
      </aside>
    )
  }
)
export default Aside

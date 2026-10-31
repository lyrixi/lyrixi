import React, { useImperativeHandle, forwardRef, useRef } from 'react'

import type { PageProps, PageRef } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import SafeArea from './../../SafeArea'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, SafeArea } from 'lyrixi-mobile'
测试使用-end */

const Page = forwardRef<PageRef, PageProps>(
  (
    {
      // Value & Display Value
      id,
      safeArea,
      full = true,
      animation,
      style,
      className,
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
      <section
        id={id}
        ref={rootRef}
        style={style}
        className={(DOMUtil.classNames as (...args: unknown[]) => string)(
          'lyrixi-page',
          full ? 'lyrixi-full' : '',
          className
        )}
        data-animation={animation}
      >
        {children}
        {safeArea === true && <SafeArea />}
      </section>
    )
  }
)
export default Page

import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react'

import type { AccordionGroupProps, AccordionGroupRef } from './types'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const AccordionGroup = forwardRef<AccordionGroupRef, AccordionGroupProps>(
  (
    {
      value,

      // Style
      style,
      className,

      // Elements
      children,

      // Events
      onChange
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState<number | null | undefined>(value)

    // Controlled component
    useEffect(() => {
      if (value !== undefined && onChange) {
        setActiveIndex(value)
      }
      // eslint-disable-next-line
    }, [value])

    // Expose
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        },
        getActiveIndex: () => {
          return activeIndex
        },
        openIndex: (index: number) => {
          if (onChange) {
            onChange(index)
          } else {
            setActiveIndex(index)
          }
        },
        close: () => {
          if (onChange) {
            onChange(null)
          } else {
            setActiveIndex(null)
          }
        }
      }
    })

    return (
      <div
        ref={rootRef}
        // Style
        style={style}
        className={DOMUtil.classNames('lyrixi-accordion-group', className)}
      >
        {/* Elements: Children */}
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child
          return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
            open: activeIndex === index,
            key: index,
            onOpen: () => {
              const newActiveIndex = index
              if (onChange) {
                onChange(newActiveIndex)
              } else {
                setActiveIndex(newActiveIndex)
              }
            },
            onClose: () => {
              if (onChange) {
                onChange(null)
              } else {
                setActiveIndex(null)
              }
            }
          })
        })}
      </div>
    )
  }
)

export default AccordionGroup

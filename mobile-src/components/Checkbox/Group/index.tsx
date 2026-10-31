import React, { forwardRef, useRef, useImperativeHandle, useMemo } from 'react'
import Checkbox from '../Checkbox'

import formatValue from './formatValue'

import type { CheckboxGroupProps, CheckboxGroupRef, CheckboxItem } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// Checkbox-Group
const CheckboxGroup = forwardRef<CheckboxGroupRef, CheckboxGroupProps>(
  (
    {
      // Value & Display Value
      id,
      value,
      list,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      placeholder: _placeholder,
      // Status
      disabled,
      readOnly,
      allowClear,
      // Value & Display Value
      multiple,
      // Style
      className,
      style,
      // Elements
      iconRender,
      // Value & Display Value
      iconPlacement = 'left',
      // Events
      onChange
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    const formattedValue = useMemo(
      () => formatValue(value, list ?? [], multiple ?? false),
      [value, list, multiple]
    )

    return (
      <div
        id={id}
        ref={rootRef}
        disabled={disabled}
        readOnly={readOnly}
        style={style}
        className={DOMUtil.classNames('lyrixi-checkbox-group', className)}
      >
        {Array.isArray(list) && list.length
          ? list.map((item) => {
              if (!item?.id) return null

              const isChecked = multiple
                ? Array.isArray(formattedValue) &&
                  formattedValue.some((valueItem) => valueItem?.id === item.id)
                : !Array.isArray(formattedValue) && formattedValue?.id === item.id

              return (
                <Checkbox
                  key={String(item.id)}
                  id={typeof item.id === 'string' ? item.id : undefined}
                  checked={isChecked}
                  iconRender={iconRender}
                  iconPlacement={iconPlacement}
                  onChange={(checked) => {
                    let newValue: CheckboxItem | CheckboxItem[] | null = null
                    if (multiple) {
                      const currentArr = Array.isArray(formattedValue) ? formattedValue : []
                      if (!checked) {
                        newValue = currentArr.filter((valueItem) => valueItem?.id !== item.id)
                      } else {
                        newValue = [...currentArr, item]
                      }
                    } else {
                      if (!checked) {
                        newValue = allowClear ? null : item
                      } else {
                        newValue = item
                      }
                    }
                    onChange?.(newValue)
                  }}
                >
                  {String(item.name || '')}
                </Checkbox>
              )
            })
          : null}
      </div>
    )
  }
)
export default CheckboxGroup

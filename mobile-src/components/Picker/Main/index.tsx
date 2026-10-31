import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import listViewFormatter from './utils/listViewFormatter'
import formatValue from './utils/formatValue'

import Layer from './Layer'
import Slots from './Slots'

import type { PickerMainSlotsRef } from './Slots/Picker.Main.Slots.types'
import type { PickerItem, PickerMainProps, PickerMainRef } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const Main = forwardRef<PickerMainRef, PickerMainProps>(
  (
    {
      // Value & Display Value
      id,
      value,
      list,

      // Style
      style,
      className,

      // Events
      onChange
    },
    ref
  ) => {
    const { lists, listCount } = listViewFormatter(list)

    // 节点
    const mainRef = useRef<HTMLDivElement | null>(null)

    const slotsRef = useRef<PickerMainSlotsRef | null>(null)

    const valueRef = useRef<PickerItem[] | null>(null)

    valueRef.current = formatValue(value, { lists, listCount })

    useImperativeHandle(ref, () => {
      return {
        mainElement: mainRef.current,
        getMainElement: () => mainRef.current,
        // 延迟解决Modal的useEffect open 后执行的问题
        getValue: () => {
          return valueRef.current
        },
        update: () => slotsRef.current?.update()
      }
    })

    return (
      <div
        id={id}
        ref={mainRef}
        // Style
        style={style}
        className={DOMUtil.classNames('lyrixi-picker-main', className)}
      >
        {/* Elements: Slots */}
        <Slots
          ref={slotsRef}
          // Value & Display Value
          lists={lists ?? undefined}
          value={valueRef.current}
          // Events
          onScrollEnd={({ rowIndex, slotIndex }) => {
            if (!valueRef.current || !lists) return
            const si = typeof slotIndex === 'string' ? Number(slotIndex) : (slotIndex as number)
            valueRef.current[si] = lists[si][rowIndex]
            onChange?.(valueRef.current)
          }}
        />

        {/* Elements: Layer */}
        <Layer />
      </div>
    )
  }
)
export default Main

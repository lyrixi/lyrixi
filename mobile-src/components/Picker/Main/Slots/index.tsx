import React, {
  useRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  type Ref,
  type MouseEvent,
  type TouchEvent
} from 'react'

import getIndex from './utils/getIndex'
import getTranslateValue from './utils/getTranslateValue'

import type {
  PickerMainSlotsProps,
  PickerMainSlotsRef,
  PickerMainSlotsSlotDragState,
  PickerMainSlotsTouchDragState
} from './Picker.Main.Slots.types'

// 内库使用-start
import MathUtil from './../../../../utils/MathUtil'
import DOMUtil from './../../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { MathUtil, DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const Slots = forwardRef<PickerMainSlotsRef, PickerMainSlotsProps>(
  ({ lists = [], value, cellHeight = 44, onScrollEnd }, ref: Ref<PickerMainSlotsRef>) => {
    const rootRef = useRef<HTMLDivElement | null>(null)
    const isDragRef = useRef(false)

    const touchesRef = useRef<PickerMainSlotsTouchDragState>({
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      endX: 0,
      endY: 0,
      startTimeStamp: 0,
      duration: 0,
      diffX: 0,
      diffY: 0,
      posY: 0,
      currentPosY: 0,
      direction: null
    })

    const slotRef = useRef<PickerMainSlotsSlotDragState>({
      slotElement: null,
      slotIndex: null,
      slotHeight: 0
    })

    // 根据 value 更新各列位置
    function update() {
      if (!rootRef.current || !lists.length || !value) return
      const slots = rootRef.current.querySelectorAll('.lyrixi-picker-slot')
      for (let i = 0; i < slots.length; i++) {
        const slot = slots[i] as HTMLElement
        const y = -getIndex(value[i], lists[i]) * cellHeight
        slot.style.transform = `translateY(${y}px)`
      }
    }

    useEffect(() => {
      isDragRef.current = false
    }, [])

    useEffect(() => {
      update()
      // eslint-disable-next-line
    }, [value])

    useImperativeHandle(ref, () => {
      return {
        rootElement: rootRef.current,
        update
      }
    })

    function handleTouchStart(e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) {
      e.stopPropagation()
      isDragRef.current = true

      if (e.type === 'touchstart') {
        e.currentTarget.addEventListener('touchmove', DOMUtil.preventDefault, false)
      }

      const target = e.target
      if (!(target instanceof HTMLUListElement)) {
        return
      }
      slotRef.current.slotElement = target
      const idxAttr = target.getAttribute('data-slot-index')
      slotRef.current.slotIndex = idxAttr
      const colIndex = idxAttr === null ? NaN : Number(idxAttr)
      const col = !Number.isNaN(colIndex) && Array.isArray(lists[colIndex]) ? lists[colIndex]! : []
      slotRef.current.slotHeight = Math.max(0, (col.length - 1) * cellHeight)

      const pos = DOMUtil.getEventPosition(e)
      touchesRef.current.startX = pos.clientX
      touchesRef.current.startY = pos.clientY
      touchesRef.current.posY = Number(getTranslateValue(target.style.transform) || 0)
      target.style.webkitTransitionDuration = '0ms'
      touchesRef.current.startTimeStamp = e.timeStamp
    }

    function handleTouchMove(e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) {
      e.stopPropagation()
      if (!isDragRef.current) {
        return
      }
      const pos = DOMUtil.getEventPosition(e)
      touchesRef.current.currentY = pos.clientY
      touchesRef.current.diffY = touchesRef.current.startY - touchesRef.current.currentY
      touchesRef.current.currentPosY = touchesRef.current.posY - touchesRef.current.diffY

      const el = slotRef.current.slotElement
      if (el) {
        el.style.webkitTransform = `translateY(${touchesRef.current.currentPosY}px)`
      }
    }

    function handleTouchEnd(e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) {
      e.stopPropagation()
      isDragRef.current = false

      if (e.type === 'touchend') {
        e.currentTarget.removeEventListener('touchmove', DOMUtil.preventDefault, false)
      }

      const pos = DOMUtil.getEventPosition(e)
      touchesRef.current.endX = pos.clientX
      touchesRef.current.endY = pos.clientY
      touchesRef.current.diffX = touchesRef.current.startX - touchesRef.current.endX
      touchesRef.current.diffY = touchesRef.current.startY - touchesRef.current.endY
      if (Math.abs(touchesRef.current.diffX) < 6 && Math.abs(touchesRef.current.diffY) < 6) {
        return
      }

      touchesRef.current.duration = e.timeStamp - touchesRef.current.startTimeStamp

      const inertia = MathUtil.inertia({
        cellSize: cellHeight,
        distance: touchesRef.current.diffY,
        duration: touchesRef.current.duration,
        currentPosition: touchesRef.current.currentPosY,
        minPosition: 0,
        maxPosition: slotRef.current.slotHeight
      })
      const position = -inertia.position

      const slotEl = slotRef.current.slotElement
      if (slotEl) {
        slotEl.style.webkitTransitionDuration = `${inertia.duration}ms`
        slotEl.style.webkitTransform = `translateY(${position}px)`
      }

      const slotIdx = slotRef.current.slotIndex
      onScrollEnd?.({
        slotIndex: slotIdx === null || slotIdx === undefined ? 0 : slotIdx,
        rowIndex: inertia.index
      })
    }

    return (
      <div
        ref={rootRef}
        className="lyrixi-picker-slotbox"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
      >
        {lists.map((list, index) => (
          <ul
            key={index}
            data-slot-index={String(index)}
            className="lyrixi-picker-slot lyrixi-text-center"
          >
            {(list || []).map((item, itemIndex) => (
              <li key={item.id ?? itemIndex}>{item.name}</li>
            ))}
          </ul>
        ))}
      </div>
    )
  }
)

export default Slots

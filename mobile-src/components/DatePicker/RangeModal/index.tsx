import React, { useEffect, useImperativeHandle, useRef, forwardRef, useState } from 'react'
import { getTitle, getDefaultRanges, updateRangeValue } from './../utils'
import formatValue from './../RangeMain/formatValue'
import RangeMain from './../RangeMain'
import type { DatePickerModalRef, DatePickerRangeModalProps } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import NavBarModal from './../../Modal/NavBarModal'
import type { ModalRef } from './../../Modal/types'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Modal } from 'lyrixi-mobile'
const NavBarModal = Modal.NavBarModal
测试使用-end */

// RangeModal
const RangeModal = forwardRef<DatePickerModalRef, DatePickerRangeModalProps>(
  (
    {
      // Value & Display Value
      id,
      value,
      autoSwapValue = true,
      type = 'date',
      min,
      max,
      hourStep,
      minuteStep,
      startDisabled,
      endDisabled,
      rangeId,
      ranges: externalRanges,
      titles,

      // Status
      open,
      rangesVisible,
      maskClosable,
      allowClear,

      // Style
      safeArea,
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,

      // Elements
      portal,
      separator,
      titleRender,
      ok,
      cancel,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      okVisible,
      cancelVisible,

      // Events
      onClose,
      onChange,
      onOk
    },
    ref
  ) => {
    let ranges = externalRanges

    if (ranges === undefined) {
      // eslint-disable-next-line
      ranges = getDefaultRanges()
    }

    const [currentValue, setCurrentValue] = useState(() => formatValue(value))

    const [currentRangeId, setCurrentRangeId] = useState<string | null | undefined>(rangeId)

    const modalRef = useRef<ModalRef | null>(null)

    const mainRef = useRef<Record<string, unknown> | null>(null)

    // 同步外部value到内部currentValue
    useEffect(() => {
      setCurrentValue(formatValue(value))
      setCurrentRangeId(rangeId)
    }, [value, rangeId])

    useImperativeHandle(ref, () => {
      return {
        ...(typeof modalRef.current === 'object' && modalRef.current !== null
          ? (modalRef.current as unknown as Record<string, unknown>)
          : {}),
        ...(typeof mainRef.current === 'object' && mainRef.current !== null ? mainRef.current : {})
      } as DatePickerModalRef
    })

    async function handleOk() {
      let val = currentValue
      if (onOk) {
        const goOn = await onOk(val ?? null)
        if (goOn === false) return false
        if (Array.isArray(goOn) && goOn.length === 2) {
          val = formatValue(goOn) ?? [goOn[0] as Date, goOn[1] as Date]
          setCurrentValue(val)
        }
      }

      // 触发 onChange
      const next = updateRangeValue(val ?? currentValue ?? [null, null], type, { autoSwapValue })
      onChange?.(next ?? null, {
        rangeId: currentRangeId,
        ranges
      })
      onClose?.()
    }

    function handleChange(newValue: (Date | null)[] | null, options?: { rangeId?: string | null }) {
      setCurrentValue(
        newValue && newValue.length === 2
          ? ([newValue[0], newValue[1]] as [Date | null, Date | null])
          : null
      )
      setCurrentRangeId(options?.rangeId)
    }

    // 自定义标题节点
    const titleNode = titleRender?.(currentValue, { type, separator }) ?? null

    return (
      <NavBarModal
        id={id}
        ref={modalRef}
        // Status
        open={open}
        maskClosable={maskClosable}
        // Style
        safeArea={safeArea}
        modalStyle={modalStyle}
        modalClassName={DOMUtil.classNames('lyrixi-modal-picker', modalClassName)}
        maskStyle={maskStyle}
        maskClassName={maskClassName}
        // Elements
        portal={portal}
        title={titleNode || getTitle(currentValue, { type, separator })}
        ok={ok}
        cancel={cancel}
        okVisible={true}
        cancelVisible={cancelVisible}
        // Events
        onClose={onClose}
        onOk={handleOk}
      >
        <RangeMain
          ref={mainRef}
          // Modal: Status
          open={open}
          // Value & Display Value
          value={currentValue}
          autoSwapValue={autoSwapValue}
          rangeId={currentRangeId}
          ranges={ranges}
          // Status
          type={type}
          rangesVisible={rangesVisible}
          allowClear={allowClear}
          min={min}
          max={max}
          hourStep={hourStep}
          minuteStep={minuteStep}
          startDisabled={startDisabled}
          endDisabled={endDisabled}
          // Elements
          titles={titles}
          portal={modalRef.current?.modalElement}
          // Events
          onChange={handleChange}
        />
      </NavBarModal>
    )
  }
)

export default RangeModal

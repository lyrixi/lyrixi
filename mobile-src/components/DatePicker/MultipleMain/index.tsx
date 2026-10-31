import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react'
import Main from './../Main'
import formatValue from './formatValue'
import getActiveTab from './getActiveTab'
import type {
  DatePickerMultipleMainProps,
  DatePickerMultipleItem,
  DatePickerPickerType
} from './../types'

// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
import TabBar from './../../TabBar'
// 内库使用-end

/* 测试使用-start
import { DateUtil, TabBar } from 'lyrixi-mobile'
测试使用-end */

// 日期多选
const MultipleMain = forwardRef<Record<string, unknown> | null, DatePickerMultipleMainProps>(
  (
    {
      // Modal: Status
      open = true,

      // Value & Display Value
      value,
      // Status
      type = 'date', // year | quarter | month | date | time | datetime | week
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      allowClear,
      min,
      max,
      hourStep,
      minuteStep,
      // Elements
      separator,
      // Events
      onChange
    },
    ref
  ) => {
    const tabsRef = useRef<DatePickerMultipleItem[] | null>(null)

    tabsRef.current = formatValue(value, type)

    const [activeTab, setActiveTab] = useState<DatePickerMultipleItem | undefined>(undefined)

    // Expose tools
    const mainRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      if (activeTab) return
      setActiveTab(getActiveTab(tabsRef.current) ?? undefined)
      // eslint-disable-next-line
    }, [value])

    useImperativeHandle(ref, () => {
      return {
        mainElement: mainRef.current,
        getMainElement: () => mainRef.current,
        getValue: () => {
          return tabsRef.current
        }
      }
    })

    const tabs = tabsRef.current

    return (
      <div ref={mainRef} className="lyrixi-picker-multiple-main">
        {Array.isArray(tabs) && tabs.length ? (
          <>
            <TabBar.Tabs
              className="lyrixi-picker-tabs"
              separator={separator}
              descriptionPlacement="top"
              list={tabs}
              value={activeTab ? { id: activeTab.id } : undefined}
              onChange={(item) => setActiveTab(item as DatePickerMultipleItem)}
            />

            {tabs.map((tab, index) => {
              // 主体内容(wrapper)是否显示
              let contentVisible = tab?.id === activeTab?.id
              if (!contentVisible) return null
              return (
                <Main
                  key={String(tab.id ?? index)}
                  // Modal: Status
                  open={open}
                  // Value & Display Value
                  value={tab.value}
                  // Style
                  className={tab.disabled ? 'lyrixi-disabled' : ''}
                  // Status
                  type={type as DatePickerPickerType}
                  min={min}
                  max={max}
                  hourStep={hourStep}
                  minuteStep={minuteStep}
                  // Events
                  onChange={(date) => {
                    tab.value = date
                    tab.name = date ? DateUtil.format(date, type) : undefined
                    onChange?.(tabsRef.current)
                  }}
                />
              )
            })}
          </>
        ) : null}
      </div>
    )
  }
)

export default MultipleMain

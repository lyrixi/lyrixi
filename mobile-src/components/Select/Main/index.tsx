import React, { forwardRef, useRef, useImperativeHandle } from 'react'

import type { SelectMainProps, SelectMainRef } from './../types'

// 内库使用-start
import ValidatorUtil from './../../../utils/ValidatorUtil'
import Result from './../../Result'
import List from './../../List'
import DOMUtil from './../../../utils/DOMUtil'
import type { ListProps } from './../../List/types'
// 内库使用-end

/* 测试使用-start
import { ValidatorUtil, Result, List } from 'lyrixi-mobile'
测试使用-end */

const Main = forwardRef<SelectMainRef, SelectMainProps>(
  (
    {
      // Value & Display Value
      id,
      value,
      list,
      formatViewItem,
      multiple,
      checkable = true,
      // Style
      className,
      style,
      itemStyle,
      itemClassName,
      // Value & Display Value
      itemLayout,
      checkboxVariant,
      checkboxPlacement,
      // Elements
      itemRender,
      // Events
      onChange
    },
    ref
  ) => {
    const mainRef = useRef<HTMLDivElement | null>(null)
    useImperativeHandle(ref, () => {
      return {
        mainElement: mainRef.current,
        getMainElement: () => mainRef.current
      }
    })

    return (
      <div
        id={id}
        ref={mainRef}
        style={style}
        className={DOMUtil.classNames('lyrixi-select-main', className)}
      >
        {ValidatorUtil.isEmpty(list) && (
          <Result className="lyrixi-select-main-result" status="empty" />
        )}

        <List
          value={value}
          list={list}
          formatViewItem={formatViewItem}
          allowClear={multiple ? true : false}
          multiple={multiple}
          checkable={checkable}
          itemStyle={itemStyle}
          itemClassName={itemClassName}
          itemLayout={itemLayout}
          checkboxVariant={checkboxVariant}
          checkboxPlacement={checkboxPlacement}
          itemRender={itemRender}
          onChange={onChange as ListProps['onChange']}
        />
      </div>
    )
  }
)

export default Main

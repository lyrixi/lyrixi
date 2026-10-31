import React, { useState, useRef, useEffect } from 'react'

import type { TextEllipsisProps } from './Text.Ellipsis.types'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import DOMUtil from './../../../utils/DOMUtil'
import checkOverflow from './checkOverflow'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const Ellipsis = ({
  // Status
  ellipsis,
  // Elements
  children
}: TextEllipsisProps) => {
  const rootRef = useRef<HTMLDivElement>(null)
  // 展开和收缩
  const [expanded, setExpanded] = useState(ellipsis?.defaultExpanded || false)
  // 展开和收缩按钮的高度
  const [toggleHeight, setToggleHeight] = useState('16px')
  // 是否真的超出了行数限制
  const [isOverflow, setIsOverflow] = useState(false)

  useEffect(() => {
    if (!ellipsis?.expandable) return
    if (!rootRef.current) return

    let isOverflow = checkOverflow(rootRef.current)
    setIsOverflow(isOverflow)
    // eslint-disable-next-line
  }, [])

  // 获取按钮高度, 用于计算::before的高度
  useEffect(() => {
    if (!isOverflow) return

    // 获取展开/收起按钮的高度
    const toggle = rootRef.current?.querySelector(
      '.lyrixi-text-ellipsis-toggle'
    ) as HTMLElement | null
    const toggleHeightPx = toggle?.offsetHeight
    if (toggleHeightPx) {
      setToggleHeight(`${toggleHeightPx}px`)
      return
    }
  }, [isOverflow])

  const style = {
    // 行数限制
    ...(ellipsis?.rows ? { WebkitLineClamp: expanded ? 999 : ellipsis?.rows } : {}),
    // 计算::before的高度
    '--lyrixi-ellipsis-before-height': `calc(100% - ${toggleHeight})`
  }

  return (
    <div
      ref={rootRef}
      className={DOMUtil.classNames(
        'lyrixi-text-ellipsis',
        isOverflow && 'lyrixi-text-ellipsis-toggle-show',
        expanded ? 'lyrixi-expanded' : ''
      )}
      style={style as React.CSSProperties}
    >
      {/* Elements: 展开和收缩按钮 */}
      {isOverflow && (
        <div
          className="lyrixi-text-ellipsis-toggle"
          onClick={(e) => {
            e.stopPropagation()
            setExpanded(!expanded)
          }}
        >
          {expanded
            ? LocaleUtil.locale('收起', 'lyrixi_def9e98b60e3bfc493bcd7693e702096')
            : LocaleUtil.locale('展开', 'lyrixi_e2edde5adbdf33f6dce59a299cbf5fad')}
        </div>
      )}
      {/* Elements: 内容 */}
      {children}
    </div>
  )
}

export default Ellipsis

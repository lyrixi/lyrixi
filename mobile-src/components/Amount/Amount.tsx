import React from 'react'

import type { AmountProps } from './types'

// 内库使用-start
import MathUtil from './../../utils/MathUtil'
import DOMUtil from './../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { MathUtil, DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// 金额
function Amount({
  // Value & Display Value
  id,
  precision = 2,
  currencySymbol,

  // Style
  style,
  className,
  noStyle,

  // Elements
  children
}: AmountProps) {
  if (isNaN(Number(children))) {
    return null
  }

  const num = MathUtil.thousands(Number(children).toFixed(precision), false)
  const integer = num.split('.')?.[0]
  const decimal = num.split('.')?.[1]

  let displayValue: React.ReactNode = null
  // No style
  if (noStyle) {
    displayValue = (currencySymbol || '') + (integer || '') + (decimal ? '.' + decimal : '')
  }
  // Default style
  else {
    displayValue = (
      <>
        {currencySymbol && <span className="lyrixi-amount-symbol">{currencySymbol}</span>}
        <span className="lyrixi-amount-integer">{integer}</span>
        {decimal && <span className="lyrixi-amount-decimal">.{decimal}</span>}
      </>
    )
  }

  return (
    <span
      id={id}
      // Style
      style={style}
      className={DOMUtil.classNames(noStyle ? '' : 'lyrixi-amount', className)}
    >
      {/* Value & Display Value */}
      {displayValue}
    </span>
  )
}

export default Amount

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import DateUtil from './../../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, DateUtil } from 'lyrixi-mobile'
测试使用-end */

import type { DatePickerPickerListItem, DatePickerPickerType } from './../../types'

// 数据
function getList(
  value: Date | null | undefined,
  type: DatePickerPickerType,
  { hourStep, minuteStep }: { hourStep?: number; minuteStep?: number }
): DatePickerPickerListItem[][] | null {
  const refDate = value instanceof Date ? value : new Date()
  if (!hourStep || typeof hourStep !== 'number') {
    // eslint-disable-next-line
    hourStep = 1
  }
  if (!minuteStep || typeof minuteStep !== 'number') {
    // eslint-disable-next-line
    minuteStep = 1
  }

  // Year
  let years: DatePickerPickerListItem[] = []
  for (let item = new Date().getFullYear() - 120; item <= new Date().getFullYear() + 120; item++) {
    years.push({
      id: item,
      name: LocaleUtil.locale(`${item}年`, 'lyrixi_41277630162b8f5811c300874c7bacac', [
        String(item)
      ])
    })
  }

  // Month
  let months: DatePickerPickerListItem[] = []
  for (let item = 1; item <= 12; item++) {
    months.push({
      id: item,
      name: LocaleUtil.locale(`${item}月`, 'lyrixi_0bb91f473d4f4fbdfb11f8953038e60b', [
        String(item)
      ])
    })
  }

  // Date
  let dates: DatePickerPickerListItem[] = []
  for (let item = 1; item <= DateUtil.getDaysInMonth(refDate); item++) {
    dates.push({
      id: item,
      name: LocaleUtil.locale(`${item}日`, 'lyrixi_61de597598e60f20242b51155990ae57', [
        String(item)
      ])
    })
  }

  // Hour
  let hours: DatePickerPickerListItem[] = []
  for (let item = 0; item <= 23; item += hourStep) {
    hours.push({
      id: item,
      name: LocaleUtil.locale(`${item}时`, 'lyrixi_f093f755e17f2104b307f9f2a0f397d7', [
        String(item)
      ])
    })
  }

  // Minute
  let minutes: DatePickerPickerListItem[] = []
  for (let item = 0; item <= 59; item += minuteStep) {
    minutes.push({
      id: item,
      name: LocaleUtil.locale(`${item}分`, 'lyrixi_c96aa1c9aa6ec548b71f3c4f6d6221e8', [
        String(item)
      ])
    })
  }

  // Quarter
  let quarters: DatePickerPickerListItem[] = []
  for (let item = 1; item <= 4; item++) {
    quarters.push({
      id: item,
      name: 'Q' + item
    })
  }

  if (type === 'year') {
    return [years]
  }
  if (type === 'quarter') {
    return [years, quarters]
  }
  if (type === 'month') {
    return [years, months]
  }
  if (type === 'date') {
    return [years, months, dates]
  }
  if (type === 'datetime') {
    return [years, months, dates, hours, minutes]
  }
  if (type === 'time') {
    return [hours, minutes]
  }

  return null
}

export default getList

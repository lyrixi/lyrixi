import type { IsDisabledError } from '../types'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, DateUtil } from 'lyrixi-mobile'
测试使用-end */

// 是否为禁用日期
function isDisabledDate(
  date: unknown,
  { min, max }: { min?: Date; max?: Date }
): false | IsDisabledError {
  if (!(date instanceof Date)) {
    const errDate = new Date()
    return {
      code: 'CALENDAR_INVALID_DATE',
      message: LocaleUtil.locale(`非法的日期格式`, 'lyrixi_8833e1f3f698d7f2671ddcabf345c56c'),
      date: errDate
    }
  }
  const d = date
  if (min instanceof Date && d.setHours(0, 0, 0, 0) < min.setHours(0, 0, 0, 0)) {
    return {
      code: 'CALENDAR_MIN_ERROR',
      message: LocaleUtil.locale(
        `禁止访问小于${DateUtil.format(min, 'YYYY年MM月DD日')}`,
        'lyrixi_d8a56c0f83b69e674b6108785f62bd52',

        [DateUtil.format(min, 'YYYY年MM月DD日')]
      ),
      date: min
    }
  }
  if (max instanceof Date && d.setHours(0, 0, 0, 0) > max.setHours(0, 0, 0, 0)) {
    return {
      code: 'CALENDAR_MAX_ERROR',
      message: LocaleUtil.locale(
        `禁止访问大于${DateUtil.format(max, 'YYYY年MM月DD日')}`,
        'lyrixi_c7f361a999c8524ee2cb2aef7e1adba2',

        [DateUtil.format(max, 'YYYY年MM月DD日')]
      ),
      date: max
    }
  }
  return false
}
export default isDisabledDate

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end
import type { DatePickerRangesMap } from './../types'

/* 测试使用-start
import { LocaleUtil, DateUtil } from 'lyrixi-mobile'
测试使用-end */

function rangeKey(node: ReturnType<typeof LocaleUtil.locale>): string {
  return String(node)
}

// 默认日期区间
function getDefaultRanges(): DatePickerRangesMap {
  return {
    [rangeKey(LocaleUtil.locale('今日', 'lyrixi_296304f1e5d0b0d638cd0c553ae90448'))]: [
      new Date(),
      new Date()
    ],
    [rangeKey(LocaleUtil.locale('昨日', 'lyrixi_23c9bc4d87ecbe1b92710fbcf953cfd4'))]: [
      DateUtil.add(new Date(), -1),
      DateUtil.add(new Date(), -1)
    ],

    [rangeKey(LocaleUtil.locale('近{0}日', 'lyrixi_7243810e4577ec95db8f7315c52ebe66', ['7']))]: [
      DateUtil.add(new Date(), -6),
      new Date()
    ],

    [rangeKey(LocaleUtil.locale('近{0}日', 'lyrixi_7243810e4577ec95db8f7315c52ebe66', ['30']))]: [
      DateUtil.add(new Date(), -29),
      new Date()
    ],

    [rangeKey(LocaleUtil.locale('近{0}日', 'lyrixi_7243810e4577ec95db8f7315c52ebe66', ['90']))]: [
      DateUtil.add(new Date(), -89),
      new Date()
    ],

    [rangeKey(LocaleUtil.locale('本周', 'lyrixi_72520580211eb4786456a6e00dc17996'))]: [
      DateUtil.startOrEnd(new Date(), 'week', 'start'),
      new Date()
    ],

    [rangeKey(LocaleUtil.locale('本月', 'lyrixi_0ec94a3708ad990830d08ed033d28b86'))]: [
      DateUtil.startOrEnd(new Date(), 'month', 'start'),
      new Date()
    ],

    [rangeKey(LocaleUtil.locale('上月', 'lyrixi_c5d35890464bc324d1c4a75612fd17b6'))]: [
      DateUtil.add(DateUtil.startOrEnd(new Date(), 'month', 'start'), -1, 'month'),
      DateUtil.add(DateUtil.startOrEnd(new Date(), 'month', 'start'), -1, 'date')
    ],

    [rangeKey(LocaleUtil.locale('本季度', 'lyrixi_0477ce74a1bb0ea3c6a9dc6a72a05e51'))]: [
      DateUtil.startOrEnd(new Date(), 'quarter', 'start'),
      new Date()
    ],

    [rangeKey(LocaleUtil.locale('今年', 'lyrixi_d3dbc7a7fd9fc5ccd168084c8579c1ec'))]: [
      DateUtil.startOrEnd(new Date(), 'year', 'start'),
      DateUtil.startOrEnd(new Date(), 'year', 'end')
    ],

    [rangeKey(LocaleUtil.locale('自定义', 'lyrixi_f1d4ff50f3828f9b73412e7d94e6dd6e'))]: 0
  }
}

export default getDefaultRanges

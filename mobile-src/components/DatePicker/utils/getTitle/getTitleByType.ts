// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

function getTitleByType(type?: string) {
  if (type === 'year') {
    return LocaleUtil.locale('选择年', 'lyrixi_49dc0093879a6d5222f2341270419a8b')
  }
  if (type === 'quarter') {
    return LocaleUtil.locale('选择季', 'lyrixi_fe46739c9d298e63f1525b4f7eca5074')
  }
  if (type === 'month') {
    return LocaleUtil.locale('选择年月', 'lyrixi_984f9c33be96ad723a221676f04980f7')
  }
  if (type === 'date') {
    return LocaleUtil.locale('选择日期', 'lyrixi_2bebddb468efabd029c860a9c6825a55')
  }
  if (type === 'time') {
    return LocaleUtil.locale('选择时间', 'lyrixi_2c825a9900473f5ef0955636820170c5')
  }
  if (type === 'datetime') {
    return LocaleUtil.locale('选择日期时间', 'lyrixi_a42ae40b58169349e34744e85b7aa71a')
  }
  if (type === 'week') {
    return LocaleUtil.locale('选择周', 'lyrixi_cf7c084a8741442e4108a1db0264f40c')
  }
  return LocaleUtil.locale('选择日期', 'lyrixi_2bebddb468efabd029c860a9c6825a55')
}

export default getTitleByType

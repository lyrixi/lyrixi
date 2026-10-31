// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

function getWeekNames(start: string) {
  if (start === 'Monday') {
    return [
      LocaleUtil.locale('一', 'lyrixi_7941da94db2a83c04d0d85ee45ecb1e3'),
      LocaleUtil.locale('二', 'lyrixi_2d8be272c9e78713e31e5c0c165422bb'),
      LocaleUtil.locale('三', 'lyrixi_e662ff59a0da04db4f9323b6b6197015'),
      LocaleUtil.locale('四', 'lyrixi_21716cf311071e8d339b611c8bdce9e4'),
      LocaleUtil.locale('五', 'lyrixi_1fcc29d077c043016d325c68d328187f'),
      LocaleUtil.locale('六', 'lyrixi_61b453523d86ac98afd3c98bdf1b0f9d'),
      LocaleUtil.locale('日', 'lyrixi_3edddd85ac2c5e612fb71dbb89e7d1c5')
    ] as string[]
  }
  return [
    LocaleUtil.locale('日', 'lyrixi_3edddd85ac2c5e612fb71dbb89e7d1c5'),
    LocaleUtil.locale('一', 'lyrixi_7941da94db2a83c04d0d85ee45ecb1e3'),
    LocaleUtil.locale('二', 'lyrixi_2d8be272c9e78713e31e5c0c165422bb'),
    LocaleUtil.locale('三', 'lyrixi_e662ff59a0da04db4f9323b6b6197015'),
    LocaleUtil.locale('四', 'lyrixi_21716cf311071e8d339b611c8bdce9e4'),
    LocaleUtil.locale('五', 'lyrixi_1fcc29d077c043016d325c68d328187f'),
    LocaleUtil.locale('六', 'lyrixi_61b453523d86ac98afd3c98bdf1b0f9d')
  ] as string[]
}

export default getWeekNames

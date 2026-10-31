// United language list
// https://ant.design/docs/react/i18n-cn
// dayjs: https://github.com/iamkun/dayjs/tree/dev/src/locale
// browser 对应 window.navigator.language
const languageMap = {
  // 阿拉伯语
  ar_EG: { browser: 'ar-EG', dayjs: 'ar', translate: { google: 'ar', bing: 'ar' } },
  // 阿塞拜疆语
  az_AZ: { browser: 'az-AZ', dayjs: 'az', translate: { google: 'az', bing: 'az' } },
  // 保加利亚语
  bg_BG: { browser: 'bg-BG', dayjs: 'bg', translate: { google: 'bg', bing: 'bg' } },
  // 孟加拉语（孟加拉国）
  bn_BD: { browser: 'bn-BD', dayjs: 'bn', translate: { google: 'bn', bing: 'bn' } },
  // 白俄罗斯语
  by_BY: { browser: 'by-BY', dayjs: 'by', translate: { google: 'by', bing: 'by' } },
  // 加泰罗尼亚语
  ca_ES: { browser: 'ca-ES', dayjs: 'ca', translate: { google: 'ca', bing: 'ca' } },
  // 捷克语
  cs_CZ: { browser: 'cs-CZ', dayjs: 'cs', translate: { google: 'cs', bing: 'cs' } },
  // 丹麦语
  da_DK: { browser: 'da-DK', dayjs: 'da', translate: { google: 'da', bing: 'da' } },
  // 德语
  de_DE: { browser: 'de-DE', dayjs: 'de', translate: { google: 'de', bing: 'de' } },
  // 希腊语
  el_GR: { browser: 'el-GR', dayjs: 'el', translate: { google: 'el', bing: 'el' } },
  // 英语
  en_GB: { browser: 'en-GB', dayjs: 'en-gb', translate: { google: 'en', bing: 'en' } },
  // 英语（美式）
  en_US: { browser: 'en-US', dayjs: 'en', translate: { google: 'en', bing: 'en' } },
  // 西班牙语
  es_ES: { browser: 'es-ES', dayjs: 'es', translate: { google: 'es', bing: 'es' } },
  // 巴斯克语
  eu_ES: { browser: 'eu-ES', dayjs: 'eu', translate: { google: 'eu', bing: 'eu' } },
  // 爱沙尼亚语
  et_EE: { browser: 'et-EE', dayjs: 'et', translate: { google: 'et', bing: 'et' } },
  // 波斯语
  fa_IR: { browser: 'fa-IR', dayjs: 'fa', translate: { google: 'fa', bing: 'fa' } },
  // 芬兰语
  fi_FI: { browser: 'fi-FI', dayjs: 'fi', translate: { google: 'fi', bing: 'fi' } },
  // 法语（比利时）
  fr_BE: { browser: 'fr-BE', dayjs: 'fr', translate: { google: 'fr', bing: 'fr' } },
  // 法语（加拿大）
  fr_CA: { browser: 'fr-CA', dayjs: 'fr-ca', translate: { google: 'fr', bing: 'fr' } },
  // 法语（法国）
  fr_FR: { browser: 'fr-FR', dayjs: 'fr', translate: { google: 'fr', bing: 'fr' } },
  // 爱尔兰语
  ga_IE: { browser: 'ga-IE', dayjs: 'ga', translate: { google: 'ga', bing: 'ga' } },
  // 加利西亚语（西班牙）
  gl_ES: { browser: 'gl-ES', dayjs: 'gl', translate: { google: 'gl', bing: 'gl' } },
  // 希伯来语
  he_IL: { browser: 'he-IL', dayjs: 'he', translate: { google: 'he', bing: 'he' } },
  // 印地语
  hi_IN: { browser: 'hi-IN', dayjs: 'hi', translate: { google: 'hi', bing: 'hi' } },
  // 克罗地亚语
  hr_HR: { browser: 'hr-HR', dayjs: 'hr', translate: { google: 'hr', bing: 'hr' } },
  // 匈牙利语
  hu_HU: { browser: 'hu-HU', dayjs: 'hu', translate: { google: 'hu', bing: 'hu' } },
  // 亚美尼亚
  hy_AM: { browser: 'hy-AM', dayjs: 'hy', translate: { google: 'hy', bing: 'hy' } },
  // 印度尼西亚语
  id_ID: { browser: 'id-ID', dayjs: 'id', translate: { google: 'id', bing: 'id' } },
  // 意大利语
  it_IT: { browser: 'it-IT', dayjs: 'it', translate: { google: 'it', bing: 'it' } },
  // 冰岛语
  is_IS: { browser: 'is-IS', dayjs: 'is', translate: { google: 'is', bing: 'is' } },
  // 日语
  ja_JP: { browser: 'ja-JP', dayjs: 'ja', translate: { google: 'ja', bing: 'ja' } },
  // 格鲁吉亚语
  ka_GE: { browser: 'ka-GE', dayjs: 'ka', translate: { google: 'ka', bing: 'ka' } },
  // 高棉语
  km_KH: { browser: 'km-KH', dayjs: 'km', translate: { google: 'km', bing: 'km' } },
  // 北库尔德语
  kmr_IQ: { browser: 'kmr-IQ', dayjs: 'kmr', translate: { google: 'kmr', bing: 'kmr' } },
  // 卡纳达语
  kn_IN: { browser: 'kn-IN', dayjs: 'kn', translate: { google: 'kn', bing: 'kn' } },
  // 哈萨克语
  kk_KZ: { browser: 'kk-KZ', dayjs: 'kk', translate: { google: 'kk', bing: 'kk' } },
  // 韩语/朝鲜语
  ko_KR: { browser: 'ko-KR', dayjs: 'ko', translate: { google: 'ko', bing: 'ko' } },
  // 立陶宛语
  lt_LT: { browser: 'lt-LT', dayjs: 'lt', translate: { google: 'lt', bing: 'lt' } },
  // 拉脱维亚语
  lv_LV: { browser: 'lv-LV', dayjs: 'lv', translate: { google: 'lv', bing: 'lv' } },
  // 马其顿语
  mk_MK: { browser: 'mk-MK', dayjs: 'mk', translate: { google: 'mk', bing: 'mk' } },
  // 马拉雅拉姆语
  ml_IN: { browser: 'ml-IN', dayjs: 'ml', translate: { google: 'ml', bing: 'ml' } },
  // 蒙古语
  mn_MN: { browser: 'mn-MN', dayjs: 'mn', translate: { google: 'mn', bing: 'mn' } },
  // 马来语 (马来西亚)
  ms_MY: { browser: 'ms-MY', dayjs: 'ms', translate: { google: 'ms', bing: 'ms' } },
  // 缅甸语
  my_MM: { browser: 'my-MM', dayjs: 'my', translate: { google: 'my', bing: 'my' } },
  // 挪威语
  nb_NO: { browser: 'nb-NO', dayjs: 'nb', translate: { google: 'nb', bing: 'nb' } },
  // 尼泊尔语
  ne_NP: { browser: 'ne-NP', dayjs: 'ne', translate: { google: 'ne', bing: 'ne' } },
  // 荷兰语（比利时）
  nl_BE: { browser: 'nl-BE', dayjs: 'nl-be', translate: { google: 'nl', bing: 'nl' } },
  // 荷兰语
  nl_NL: { browser: 'nl-NL', dayjs: 'nl', translate: { google: 'nl', bing: 'nl' } },
  // 波兰语
  pl_PL: { browser: 'pl-PL', dayjs: 'pl', translate: { google: 'pl', bing: 'pl' } },
  // 葡萄牙语(巴西)
  pt_BR: { browser: 'pt-BR', dayjs: 'pt-br', translate: { google: 'pt', bing: 'pt' } },
  // 葡萄牙语
  pt_PT: { browser: 'pt-PT', dayjs: 'pt', translate: { google: 'pt', bing: 'pt' } },
  // 罗马尼亚语
  ro_RO: { browser: 'ro-RO', dayjs: 'ro', translate: { google: 'ro', bing: 'ro' } },
  // 俄罗斯语
  ru_RU: { browser: 'ru-RU', dayjs: 'ru', translate: { google: 'ru', bing: 'ru' } },
  // 僧伽罗语
  si_LK: { browser: 'si-LK', dayjs: 'si', translate: { google: 'si', bing: 'si' } },
  // 斯洛伐克语
  sk_SK: { browser: 'sk-SK', dayjs: 'sk', translate: { google: 'sk', bing: 'sk' } },
  // 塞尔维亚语
  sr_RS: { browser: 'sr-RS', dayjs: 'sr', translate: { google: 'sr', bing: 'sr' } },
  // 斯洛文尼亚语
  sl_SI: { browser: 'sl-SI', dayjs: 'sl', translate: { google: 'sl', bing: 'sl' } },
  // 瑞典语
  sv_SE: { browser: 'sv-SE', dayjs: 'sv', translate: { google: 'sv', bing: 'sv' } },
  // 泰米尔语
  ta_IN: { browser: 'ta-IN', dayjs: 'ta', translate: { google: 'ta', bing: 'ta' } },
  // 泰语
  th_TH: { browser: 'th-TH', dayjs: 'th', translate: { google: 'th', bing: 'th' } },
  // 土耳其语
  tr_TR: { browser: 'tr-TR', dayjs: 'tr', translate: { google: 'tr', bing: 'tr' } },
  // 土库曼
  tk_TK: { browser: 'tk-TK', dayjs: 'tk', translate: { google: 'tk', bing: 'tk' } },
  // 乌尔都语 (巴基斯坦)
  ur_PK: { browser: 'ur-PK', dayjs: 'ur', translate: { google: 'ur', bing: 'ur' } },
  // 乌克兰语
  uk_UA: { browser: 'uk-UA', dayjs: 'uk', translate: { google: 'uk', bing: 'uk' } },
  // 乌兹别克语（拉丁字母）
  uz_UZ: { browser: 'uz-UZ', dayjs: 'uz', translate: { google: 'uz', bing: 'uz' } },
  // 越南语
  vi_VN: { browser: 'vi-VN', dayjs: 'vi', translate: { google: 'vi', bing: 'vi' } },
  // 简体中文
  zh_CN: { browser: 'zh-CN', dayjs: 'zh-cn', translate: { google: 'zh-CN', bing: 'zh-CN' } },
  // 繁体中文（中国香港）
  zh_HK: { browser: 'zh-HK', dayjs: 'zh-hk', translate: { google: 'zh-HK', bing: 'zh-HK' } },
  // 繁体中文（中国台湾）
  zh_TW: { browser: 'zh-TW', dayjs: 'zh-tw', translate: { google: 'zh-TW', bing: 'zh-TW' } }
}

export default languageMap

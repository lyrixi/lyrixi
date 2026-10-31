/** Lyrixi 内部语言编码，与 languageMap 键名一致 */
export type LanguageCode =
  | 'ar_EG'
  | 'az_AZ'
  | 'bg_BG'
  | 'bn_BD'
  | 'by_BY'
  | 'ca_ES'
  | 'cs_CZ'
  | 'da_DK'
  | 'de_DE'
  | 'el_GR'
  | 'en_GB'
  | 'en_US'
  | 'es_ES'
  | 'eu_ES'
  | 'et_EE'
  | 'fa_IR'
  | 'fi_FI'
  | 'fr_BE'
  | 'fr_CA'
  | 'fr_FR'
  | 'ga_IE'
  | 'gl_ES'
  | 'he_IL'
  | 'hi_IN'
  | 'hr_HR'
  | 'hu_HU'
  | 'hy_AM'
  | 'id_ID'
  | 'it_IT'
  | 'is_IS'
  | 'ja_JP'
  | 'ka_GE'
  | 'km_KH'
  | 'kmr_IQ'
  | 'kn_IN'
  | 'kk_KZ'
  | 'ko_KR'
  | 'lt_LT'
  | 'lv_LV'
  | 'mk_MK'
  | 'ml_IN'
  | 'mn_MN'
  | 'ms_MY'
  | 'my_MM'
  | 'nb_NO'
  | 'ne_NP'
  | 'nl_BE'
  | 'nl_NL'
  | 'pl_PL'
  | 'pt_BR'
  | 'pt_PT'
  | 'ro_RO'
  | 'ru_RU'
  | 'si_LK'
  | 'sk_SK'
  | 'sr_RS'
  | 'sl_SI'
  | 'sv_SE'
  | 'ta_IN'
  | 'th_TH'
  | 'tr_TR'
  | 'tk_TK'
  | 'ur_PK'
  | 'uk_UA'
  | 'uz_UZ'
  | 'vi_VN'
  | 'zh_CN'
  | 'zh_HK'
  | 'zh_TW'

/** BCP 47 browser 语言编码，与 languageMap.browser 一致 */
export enum BrowserLanguageCode {
  ar_EG = 'ar-EG',
  az_AZ = 'az-AZ',
  bg_BG = 'bg-BG',
  bn_BD = 'bn-BD',
  by_BY = 'by-BY',
  ca_ES = 'ca-ES',
  cs_CZ = 'cs-CZ',
  da_DK = 'da-DK',
  de_DE = 'de-DE',
  el_GR = 'el-GR',
  en_GB = 'en-GB',
  en_US = 'en-US',
  es_ES = 'es-ES',
  eu_ES = 'eu-ES',
  et_EE = 'et-EE',
  fa_IR = 'fa-IR',
  fi_FI = 'fi-FI',
  fr_BE = 'fr-BE',
  fr_CA = 'fr-CA',
  fr_FR = 'fr-FR',
  ga_IE = 'ga-IE',
  gl_ES = 'gl-ES',
  he_IL = 'he-IL',
  hi_IN = 'hi-IN',
  hr_HR = 'hr-HR',
  hu_HU = 'hu-HU',
  hy_AM = 'hy-AM',
  id_ID = 'id-ID',
  it_IT = 'it-IT',
  is_IS = 'is-IS',
  ja_JP = 'ja-JP',
  ka_GE = 'ka-GE',
  km_KH = 'km-KH',
  kmr_IQ = 'kmr-IQ',
  kn_IN = 'kn-IN',
  kk_KZ = 'kk-KZ',
  ko_KR = 'ko-KR',
  lt_LT = 'lt-LT',
  lv_LV = 'lv-LV',
  mk_MK = 'mk-MK',
  ml_IN = 'ml-IN',
  mn_MN = 'mn-MN',
  ms_MY = 'ms-MY',
  my_MM = 'my-MM',
  nb_NO = 'nb-NO',
  ne_NP = 'ne-NP',
  nl_BE = 'nl-BE',
  nl_NL = 'nl-NL',
  pl_PL = 'pl-PL',
  pt_BR = 'pt-BR',
  pt_PT = 'pt-PT',
  ro_RO = 'ro-RO',
  ru_RU = 'ru-RU',
  si_LK = 'si-LK',
  sk_SK = 'sk-SK',
  sr_RS = 'sr-RS',
  sl_SI = 'sl-SI',
  sv_SE = 'sv-SE',
  ta_IN = 'ta-IN',
  th_TH = 'th-TH',
  tr_TR = 'tr-TR',
  tk_TK = 'tk-TK',
  ur_PK = 'ur-PK',
  uk_UA = 'uk-UA',
  uz_UZ = 'uz-UZ',
  vi_VN = 'vi-VN',
  zh_CN = 'zh-CN',
  zh_HK = 'zh-HK',
  zh_TW = 'zh-TW'
}

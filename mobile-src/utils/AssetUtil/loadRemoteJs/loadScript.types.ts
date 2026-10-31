// IE8 等旧环境下 script 上存在 readystate / onreadystatechange（DOM 类型未完整收录）
export type AssetUtilLoadScriptLegacyIEScript = HTMLScriptElement & {
  onreadystatechange?: ((this: AssetUtilLoadScriptLegacyIEScript, ev: Event) => void) | null
  readyState?: string
}

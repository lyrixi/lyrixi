// 获取translateX或者translateY的值
function getTranslateValue(transform: string | null | undefined): string | null {
  return transform?.match(/-?\d+/)?.[0] || null
}

export default getTranslateValue

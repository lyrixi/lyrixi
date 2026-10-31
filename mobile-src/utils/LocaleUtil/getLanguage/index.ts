// 获取当前语言
function getLanguage() {
  return (
    window.lyrixiLocaleLanguage ||
    navigator.userAgent.match(/lyrixiLanguage\/([\w.]*)/)?.[1] ||
    'zh_CN'
  )
}

export default getLanguage

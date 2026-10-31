/**
 * 获取浏览器内核
 * @returns {String} 内核类型：'trident' | 'presto' | 'webkit' | 'gecko' | ''
 */
function getKernel() {
  let ua = navigator.userAgent.toLowerCase()
  if (ua.indexOf('trident') > -1) {
    return 'trident'
  } else if (ua.indexOf('presto') > -1) {
    return 'presto'
  } else if (ua.indexOf('applewebkit') > -1) {
    return 'webkit'
  } else if (ua.indexOf('gecko') > -1 && ua.indexOf('khtml') === -1) {
    return 'gecko'
  }
  return ''
}

export default getKernel

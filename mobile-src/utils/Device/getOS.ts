/**
 * 获取操作系统信息
 * @returns {Object} {os: String, osVersion: String}
 */
function getOS() {
  let ua = navigator.userAgent.toLowerCase()
  let os = ''
  let osVersion = ''
  let androidExp = ua.match(/android\s*(\d*\.*\d*)/)
  let iosExp = ua.match(/cpu iphone os (.*?) like mac os/)
  let harmonyExp = ua.match(/openharmony\s*(\d*\.*\d*)/)

  if (androidExp) {
    os = 'android'
    osVersion = androidExp[1]
  } else if (iosExp) {
    os = 'ios'
    osVersion = iosExp[1]
  } else if (harmonyExp) {
    os = 'harmony'
    osVersion = harmonyExp[1]
  }

  return { os, osVersion }
}

export default getOS

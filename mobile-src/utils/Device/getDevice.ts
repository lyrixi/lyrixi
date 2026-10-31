/**
 * 获取设备类型
 * @returns {String} 设备类型：'mobile' | 'pc'
 */
function getDevice() {
  let ua = navigator.userAgent.toLowerCase()
  if (ua.match(/applewebkit.*mobile.*/)) {
    return 'mobile'
  }
  return 'pc'
}

export default getDevice

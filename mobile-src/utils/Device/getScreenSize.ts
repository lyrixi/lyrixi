/**
 * 获取屏幕宽度
 * @returns {Number} 屏幕宽度
 */
function getScreenWidth() {
  if (window.innerWidth) return window.innerWidth
  if (window.screen.width) return window.screen.width
  if (window.screen.availWidth) return window.screen.availWidth
}

/**
 * 获取屏幕高度
 * @returns {Number} 屏幕高度
 */
function getScreenHeight() {
  if (window.innerHeight) return window.innerHeight
  if (window.screen.height) return window.screen.height
  if (window.screen.availHeight) return window.screen.availHeight
}

export { getScreenWidth, getScreenHeight }

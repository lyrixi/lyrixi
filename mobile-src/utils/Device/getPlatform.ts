/**
 * 获取平台信息
 * @returns {Object} {platform: String, platformVersion: String}
 */
function getPlatform() {
  let ua = navigator.userAgent.toLowerCase()
  let platform = ''
  let platformVersion = ''
  let platformMatch: RegExpMatchArray | null = null

  // 微信小程序
  if (ua.indexOf('miniprogram') > -1 && ua.indexOf('micromessenger') > -1) {
    if (ua.indexOf('wxwork') > -1) {
      platform = 'wecomMiniProgram'
      platformMatch = ua.match(/wxwork\/([\w.]*)/)
    } else if (ua.indexOf('micromessenger') > -1) {
      platform = 'wechatMiniProgram'
      platformMatch = ua.match(/micromessenger\/([\w.]*)/)
    }
    if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
  }
  // 企业微信
  else if (ua.indexOf('wxwork') > -1) {
    platform = 'wecom'
    platformMatch = ua.match(/wxwork\/([\w.]*)/)
    if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
  }
  // 微信
  else if (ua.indexOf('micromessenger') > -1) {
    platform = 'wechat'
    platformMatch = ua.match(/micromessenger\/([\w.]*)/)
    if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
  }
  // 支付宝
  else if (ua.indexOf('alipay') > -1) {
    platform = 'alipay'
    if (ua.indexOf('miniprogram') > -1) {
      platform = 'alipayMiniProgram'
    }
    platformMatch = ua.match(/alipayclient\/([\w.]*)/)
    if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
  }
  // 钉钉
  else if (ua.indexOf('dingtalk') > -1) {
    platform = 'dingtalk'
    platformMatch = ua.match(/dingtalk\/([\w.]*)/)
    if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
  }
  // 飞书
  else if (ua.indexOf('lark') > -1) {
    platform = 'lark'
    platformMatch = ua.match(/lark\/([\w.]*)/)
    if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
  }
  // Lyrixi App
  else if (ua.indexOf('lyrixi') > -1) {
    platform = 'lyrixi'
    platformMatch = ua.match(/lyrixi\/([\w.]*)/)
    if (platformMatch && platformMatch[1]) platformVersion = platformMatch[1]
  }
  // QQ
  else if (ua.indexOf('mqqbrowser') > -1) {
    platform = 'qq'
  }
  // UC
  else if (ua.indexOf('ucbrowser') > -1) {
    platform = 'uc'
  }
  // 其它浏览器
  else {
    platform = 'browser'
    const platformMatch = ua.match(/version\/([\d.]+)/)
    platformVersion = platformMatch?.[1] || ''
  }

  return { platform, platformVersion }
}

export default getPlatform

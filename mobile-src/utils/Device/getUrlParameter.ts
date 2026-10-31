/**
 * 获取地址栏参数
 * @param {String} paramName - 参数名，如果不传则返回所有参数对象或查询字符串
 * @param {String} url - 自定义查询字符串，如果不传则使用 window.location.href
 * @returns {String|Object} 参数值、所有参数对象或查询字符串
 */
function getUrlParameter(paramName?: string, url?: string) {
  // eslint-disable-next-line no-param-reassign
  if (!url) url = window.location.href
  const params: Record<string, string> = {}
  // 如果url中包含?说明有参数
  if (url?.includes('?')) {
    // 获取所有参数options: 如?a=1&b=2转为['a=1','b=2']
    let options = url.split('?')[1]?.split('&')
    if (options?.length) {
      for (let i = 0; i < options.length; i++) {
        // 获取单项option: 如'a=1'转为['a', '1']
        let option = options[i].split('=')
        if (option.length === 2) {
          params[option[0]] = option[1]
        }
      }
    }
  }

  // 无参时, 指定参数名返回空字符串, 否则返回null
  if (!Object.keys(params).length) {
    if (paramName) return ''
    return null
  }

  // 有参时, 指定参数名字符串, 否则返回全部参数
  if (paramName) {
    if (params.hasOwnProperty(paramName)) {
      return params[paramName as keyof typeof params]
    }
    return ''
  }
  return params
}

export default getUrlParameter

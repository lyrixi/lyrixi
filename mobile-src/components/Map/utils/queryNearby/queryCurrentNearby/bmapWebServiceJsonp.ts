const BMAP_PLACE_SEARCH_URL = 'https://api.map.baidu.com/place/v2/search'

function bmapWebServiceJsonp<T>(params: Record<string, string | number>): Promise<T> {
  return new Promise((resolve, reject) => {
    const callbackName = `__lyrixiBmapJsonp_${Date.now()}_${Math.random().toString(36).slice(2)}`
    const searchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      searchParams.set(key, String(value))
    }
    searchParams.set('callback', callbackName)

    const script = document.createElement('script')
    const fullUrl = `${BMAP_PLACE_SEARCH_URL}?${searchParams.toString()}`

    const win = window as unknown as Record<string, unknown>

    const cleanup = (): void => {
      delete win[callbackName]
      script.remove()
    }

    const timer = window.setTimeout(() => {
      cleanup()
      reject(new Error('bmap jsonp timeout'))
    }, 5000)

    win[callbackName] = (data: T) => {
      window.clearTimeout(timer)
      cleanup()
      resolve(data)
    }

    script.onerror = () => {
      window.clearTimeout(timer)
      cleanup()
      reject(new Error('bmap jsonp script error'))
    }

    script.src = fullUrl
    document.head.appendChild(script)
  })
}

export default bmapWebServiceJsonp

function serializeParams(val: unknown, prefix = ''): string | unknown {
  if (val && Object.prototype.toString.call(val) === '[object Object]') {
    const usp = new URLSearchParams()
    const build = (o: Record<string, unknown>, p: string) => {
      Object.keys(o).forEach((key) => {
        const paramKey = p ? `${p}.${key}` : key
        if (o[key] && typeof o[key] === 'object') {
          build(o[key] as Record<string, unknown>, paramKey)
        } else {
          usp.append(paramKey, String(o[key]))
        }
      })
    }
    build(val as Record<string, unknown>, prefix)
    return usp.toString()
  }
  return val
}

export default serializeParams

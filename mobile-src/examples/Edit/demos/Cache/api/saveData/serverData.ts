// 本地数据转为服务器数据
function serverData(opts: { baseData?: unknown; data?: unknown }) {
  const { baseData, data } = opts
  return new Promise((resolve) => {
    resolve({
      ...(baseData as Record<string, unknown>),
      ...(data as Record<string, unknown>)
    })
  })
}

export default serverData

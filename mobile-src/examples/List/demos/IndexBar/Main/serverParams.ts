// 将 queryParams 转换为 API 参数
function serverData(queryParams: Record<string, unknown>) {
  const params = {
    rows: 50,
    ...queryParams
  }

  return params
}

export default serverData

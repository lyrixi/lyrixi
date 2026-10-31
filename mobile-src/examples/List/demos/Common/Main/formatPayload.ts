// 将 dateType、rankType、sortType 等转换为 API 参数
function formatPayload({ page, ...payload }: { page?: number } & Record<string, unknown>) {
  const params = {
    ...payload,
    page
  }
  return params
}

export default formatPayload

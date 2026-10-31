function validateData(opts: { form?: unknown }) {
  const { form } = opts
  const f = form as {
    validateFields: () => Promise<unknown>
    getFieldsValue: () => unknown
  }
  return new Promise((resolve) => {
    if (f) {
      f.validateFields()
        .then(() => resolve(f.getFieldsValue()))
        .catch(() => resolve(false))
      return
    }
    resolve(false)
  })
}

export default validateData

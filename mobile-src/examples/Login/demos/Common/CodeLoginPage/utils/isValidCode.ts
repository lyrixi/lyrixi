function isValidCode(value: unknown): boolean {
  return /^\d{6}$/.test(String(value || '').trim())
}

export default isValidCode

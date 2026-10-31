function isValidPassword(value: unknown): boolean {
  return String(value || '').length > 0
}

export default isValidPassword

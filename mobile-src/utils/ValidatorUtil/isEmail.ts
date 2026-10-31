const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isEmail(str: string): boolean {
  return emailPattern.test(str)
}

export default isEmail

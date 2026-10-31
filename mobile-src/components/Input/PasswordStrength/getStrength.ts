function getStrength(password: string): number {
  if (password.length === 0) return 0

  let matches = 0
  if (password.match(/[a-z]/g)) matches++
  if (password.match(/[A-Z]/g)) matches++
  if (password.match(/[0-9]/g)) matches++
  if (password.match(/[^a-zA-Z0-9]/g)) matches++

  if (matches === 3) {
    return 2
  }

  if (matches > 3) {
    if (password.length > 8) return 3
    return 2
  }

  return 1
}

export default getStrength

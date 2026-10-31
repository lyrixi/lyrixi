function getFileExtension(src: string): string | null {
  if (typeof src !== 'string') {
    return ''
  }
  const match = src.match(/\.([a-zA-Z0-9]+)(?:\?.*)?$/)
  return match ? match[1] : null
}

export default getFileExtension

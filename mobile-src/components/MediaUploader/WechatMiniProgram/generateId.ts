let counter = 0

function generateId(): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000)
  counter = (counter + 1) % 10000

  let processId = ''
  try {
    if (typeof process !== 'undefined' && process.pid) {
      processId = process.pid.toString().slice(-2)
    }
  } catch (e) {
    // ignore
  }

  return `${timestamp}${random.toString().padStart(4, '0')}${counter
    .toString()
    .padStart(4, '0')}${processId}`
}

export default generateId

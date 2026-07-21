/** LocalStorage-backed async-storage stub for RN-web preview. */
const memory = new Map<string, string>()

const AsyncStorage = {
  async getItem(key: string) {
    return memory.has(key) ? memory.get(key)! : localStorage.getItem(key)
  },
  async setItem(key: string, value: string) {
    memory.set(key, value)
    localStorage.setItem(key, value)
  },
  async removeItem(key: string) {
    memory.delete(key)
    localStorage.removeItem(key)
  },
  async clear() {
    memory.clear()
    localStorage.clear()
  },
}

export default AsyncStorage

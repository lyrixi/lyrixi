/** Clipboard stub for RN-web docs preview. */
const Clipboard = {
  async getString() {
    return navigator.clipboard?.readText?.() ?? ''
  },
  async setString(text: string) {
    await navigator.clipboard?.writeText?.(text)
  },
}

export default Clipboard

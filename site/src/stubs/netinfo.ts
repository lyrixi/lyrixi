/** NetInfo stub — always online in the browser preview. */
const NetInfo = {
  addEventListener(_listener: (state: { isConnected: boolean }) => void) {
    return () => undefined
  },
  async fetch() {
    return { isConnected: true, type: 'wifi' }
  },
}

export default NetInfo

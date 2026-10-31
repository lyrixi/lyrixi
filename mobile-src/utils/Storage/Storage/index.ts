import localforage from 'localforage'

// 文档: https://localforage.docschina.org/#api
const Storage = {
  // 从仓库中获取 key 对应的值。如果 key 不存在，getItem() 将返回 null。
  getItem: (key: string) => {
    if (!key) {
      console.error('Storage.getItem: key is empty')
      return Promise.resolve(null)
    }
    return localforage.getItem(key)
  },
  // 获取所有 key
  keys: () => {
    return localforage.keys()
  },
  // 按 key 列表获取数据；无参则获取全部
  getItems: async (keyNameList?: string[]) => {
    const keys = keyNameList?.length ? keyNameList : await localforage.keys()
    const items: Record<string, unknown> = {}
    for (const key of keys) {
      items[key] = await localforage.getItem(key)
    }
    return items
  },
  // 将数据保存到离线仓库。
  setItem: (key: string, value: unknown) => {
    if (!key) {
      console.error('Storage.setItem: key is empty')
      return Promise.resolve(null)
    }
    return localforage.setItem(key, value)
  },
  // 从离线仓库中删除 key 对应的值。
  removeItem: (key: string) => {
    if (!key) {
      console.error('Storage.removeItem: key is empty')
      return Promise.resolve(undefined)
    }
    return localforage.removeItem(key)
  },
  // 从数据库中删除所有的 key，重置数据库。
  clear: () => {
    return localforage.clear()
  }
}

export default Storage

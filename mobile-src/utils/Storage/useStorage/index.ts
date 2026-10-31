import { useEffect, useState } from 'react'
import Storage from './../Storage'

// 与 Storage 同步的 state：初始化异步回填，每次 set 都会写入 Storage
function useStorage<T>(value: T, options: { name: string }) {
  const { name } = options
  const [data, setData] = useState<T>(value)

  useEffect(() => {
    if (!name) return
    let cancelled = false
    Storage.getItem(name).then((cached) => {
      if (!cancelled && cached !== undefined && cached !== null) {
        setData(cached as T)
      }
    })
    return () => {
      cancelled = true
    }
  }, [name])

  const setValue = (newValue: T) => {
    if (!name) {
      console.error('Storage.useStorage: name is empty')
      return
    }
    if (newValue === undefined || newValue === null) {
      void Storage.removeItem(name)
    } else {
      void Storage.setItem(name, newValue)
    }
    setData(newValue)
  }

  return [data, setValue] as const
}

export default useStorage

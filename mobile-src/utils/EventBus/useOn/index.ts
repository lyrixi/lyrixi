import { useEffect, useRef } from 'react'

import EventBus from '../EventBus'

import type { EventBusEventHandler } from '../EventBus.types'

// 组件内订阅事件，卸载时自动取消订阅
function useOn(eventName: string, fn: EventBusEventHandler) {
  const fnRef = useRef(fn)
  fnRef.current = fn

  useEffect(() => {
    if (!eventName) return

    const handler: EventBusEventHandler = (...args) => fnRef.current(...args)
    EventBus.on(eventName, handler)
    return () => {
      EventBus.off(eventName, handler)
    }
  }, [eventName])
}

export default useOn

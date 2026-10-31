import { useCallback } from 'react'

import EventBus from '../EventBus'

// 组件内发布事件，返回稳定的 emit 函数
function useEmit() {
  return useCallback((eventName: string, ...args: unknown[]) => {
    return EventBus.emit(eventName, ...args)
  }, [])
}

export default useEmit

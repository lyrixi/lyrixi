import React, { useEffect } from 'react'

import type { CardContentProps } from './types'

function Content({ data, onClick }: CardContentProps) {
  useEffect(() => {
    // 初始化
    // eslint-disable-next-line
  }, [data])

  return <div onClick={onClick}>Content</div>
}

export default Content

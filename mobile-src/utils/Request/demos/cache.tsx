import React from 'react'
import { Request } from 'lyrixi-mobile'

export default function RequestCacheDemo() {
  async function handleClick() {
    let response = await Request.get(
      'https://lyrixi.github.io/lyrixi/assets/district/en_US/86.json',
      null,
      {
        cacheKey: '0'
      }
    )
    console.log(response)
  }
  return (
    <>
      <div onClick={handleClick}>Request by cacheKey</div>
    </>
  )
}

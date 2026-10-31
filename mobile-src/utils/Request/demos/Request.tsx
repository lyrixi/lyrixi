import React from 'react'
import { Request } from 'lyrixi-mobile'

export default function RequestDemo() {
  async function handleClick() {
    let response = await Request.get(
      'https://lyrixi.github.io/lyrixi/assets/district/zh_CN/86.json.info'
    )
    console.log(response)
  }
  return (
    <>
      <div onClick={handleClick}>Request get</div>
    </>
  )
}

import React from 'react'
import { Clipboard } from 'lyrixi-mobile'

export default function ArrayUtilDemo() {
  function handleClick() {
    Clipboard.setString('https://lyrixi.github.io/lyrixi')
  }
  return (
    <>
      <div onClick={handleClick}>Copy to clipboard</div>
    </>
  )
}

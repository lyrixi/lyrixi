import React, { useEffect } from 'react'
import { SafeArea } from 'lyrixi-mobile'

export default function SafeAreaDemo() {
  useEffect(() => {}, [])

  return (
    <div
      className="lyrixi-flex lyrixi-position-absolute lyrixi-full"
      data-safe-area="auto-border-bottom"
      style={{ backgroundColor: 'green', borderColor: 'red' }}
    >
      You can test it on mobile, if you can see a red rectangle, the mobile needs a safe area
      <SafeArea style={{ backgroundColor: 'red' }} />
      Use root stage safe area
      <div>{`If you want to test to the safe area, you can invoke: SafeArea.debug()`}</div>
    </div>
  )
}

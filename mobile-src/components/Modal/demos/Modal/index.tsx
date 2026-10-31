import React, { useState } from 'react'
import { Page, Modal, Divider, Button } from 'lyrixi-mobile'
import type { ModalAnimation } from 'lyrixi-mobile'

const basicAnimations: ModalAnimation[] = [
  'none',
  'slideLeft',
  'slideRight',
  'slideUp',
  'slideDown',
  'zoom',
  'fade'
]

const cornerAnimations: ModalAnimation[] = [
  'slideUpLeft',
  'zoomUpLeft',
  'fadeUpLeft',
  'slideDownLeft',
  'zoomDownLeft',
  'fadeDownLeft',
  'slideUpRight',
  'zoomUpRight',
  'fadeUpRight',
  'slideDownRight',
  'zoomDownRight',
  'fadeDownRight'
]

const animations = [...basicAnimations, ...cornerAnimations]

const buttonStyle = {
  margin: 'var(--lyrixi-space-m)'
}

function createOpenMap(): Record<ModalAnimation, boolean> {
  return Object.fromEntries(animations.map((item) => [item, false])) as Record<
    ModalAnimation,
    boolean
  >
}

export default function ModalDemo() {
  const [openMap, setOpenMap] = useState<Record<ModalAnimation, boolean>>(createOpenMap)

  function handleOpen(animation: ModalAnimation) {
    setOpenMap((prev) => ({ ...prev, [animation]: true }))
  }

  function handleClose(animation: ModalAnimation) {
    setOpenMap((prev) => ({ ...prev, [animation]: false }))
  }

  function renderButtons(list: ModalAnimation[]) {
    return list.map((item) => (
      <Button
        key={item}
        variant="solid"
        color="primary"
        radius="m"
        style={buttonStyle}
        onClick={() => handleOpen(item)}
      >
        {item}
      </Button>
    ))
  }

  return (
    <Page>
      <Page.Header className="lyrixi-text-center">Modal</Page.Header>
      <Page.Main className="lyrixi-bg-white">
        <Divider>animation</Divider>
        {renderButtons(basicAnimations)}
        <Divider>corner animation</Divider>
        {renderButtons(cornerAnimations)}
        {animations.map((item) => (
          <Modal
            key={item}
            open={openMap[item]}
            onClose={() => handleClose(item)}
            animation={item}
            maskClosable={true}
          >
            <div className="lyrixi-bg-white" style={{ height: '300px', width: '300px' }}>
              animation: {item}
            </div>
          </Modal>
        ))}
      </Page.Main>
    </Page>
  )
}

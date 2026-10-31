import React, { useState, useRef, type ComponentRef } from 'react'
import { Page, Modal, Flex, Button } from 'lyrixi-mobile'

export default function ModalDropdownModalDemo() {
  const leftRef = useRef<ComponentRef<typeof Button>>(null)
  const centerRef = useRef<ComponentRef<typeof Button>>(null)
  const rightRef = useRef<ComponentRef<typeof Button>>(null)
  const [active, setActive] = useState<'left' | 'center' | 'right' | null>(null)

  function handleToggle(key: 'left' | 'center' | 'right') {
    setActive(active === key ? null : key)
  }

  const content = <div style={{ height: '150px' }}>Content</div>

  return (
    <Page>
      <Page.Header className="lyrixi-text-center">DropdownModal</Page.Header>
      <Page.Main className="lyrixi-bg-white">
        <Flex justify="between" style={{ padding: 12 }}>
          <Button ref={leftRef} onClick={() => handleToggle('left')}>
            Left
          </Button>
          <Button ref={centerRef} onClick={() => handleToggle('center')}>
            Center
          </Button>
          <Button ref={rightRef} onClick={() => handleToggle('right')}>
            Right
          </Button>
        </Flex>
        <Modal.DropdownModal
          open={active === 'left'}
          onClose={() => setActive(null)}
          referenceElement={leftRef.current?.element}
          left={12}
        >
          {content}
        </Modal.DropdownModal>
        <Modal.DropdownModal
          open={active === 'center'}
          onClose={() => setActive(null)}
          referenceElement={centerRef.current?.element}
        >
          {content}
        </Modal.DropdownModal>
        <Modal.DropdownModal
          open={active === 'right'}
          onClose={() => setActive(null)}
          referenceElement={rightRef.current?.element}
          right={12}
        >
          {content}
        </Modal.DropdownModal>
      </Page.Main>
    </Page>
  )
}

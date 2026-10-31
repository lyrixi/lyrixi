import React, { useState } from 'react'
import { Page, Modal, Divider } from 'lyrixi-mobile'

export default function ModalNavBarModalDemo() {
  const [open, setOpen] = useState(false)

  function handleToggle() {
    setOpen(!open)
  }

  function handleOk() {
    console.log('确定按钮被点击')
    setOpen(false)
  }

  return (
    <Page>
      <Page.Header className="lyrixi-text-center">NavBarModal</Page.Header>
      <Page.Main className="lyrixi-bg-white">
        <Divider onClick={handleToggle}>NavBarModal open toggle</Divider>
        <Modal.NavBarModal
          cancelPlacement="right"
          open={open}
          onClose={() => setOpen(false)}
          title="Title"
          ok="Ok"
          // cancel="Cancel"
          onOk={handleOk}
          // onCancel={handleCancel}
        >
          <div style={{ height: '300px', width: '300px' }}>Content</div>
        </Modal.NavBarModal>
      </Page.Main>
    </Page>
  )
}

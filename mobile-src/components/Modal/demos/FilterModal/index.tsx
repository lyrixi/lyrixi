import React, { useState, useRef } from 'react'
import { Icon, Page, Modal, FooterBar, Icons, Divider } from 'lyrixi-mobile'

export default function ModalFilterModalDemo() {
  const modalRef = useRef(null)
  const [open, setOpen] = useState(false)

  function handleToggle() {
    setOpen(!open)
  }

  return (
    <Page>
      <Page.Header className="lyrixi-text-center">FilterModal</Page.Header>
      <Page.Main className="lyrixi-bg-white">
        <Divider onClick={handleToggle}>FilterModal open toggle</Divider>
        <Modal.FilterModal
          ref={modalRef}
          open={open}
          onClose={() => setOpen(false)}
          footerRender={({ onClose }) => (
            <Page.Footer>
              <FooterBar>
                <FooterBar.Button
                  style={{ padding: 0 }}
                  direction="vertical"
                  fontSize="12px"
                  onClick={() => {
                    console.log('setting')
                  }}
                >
                  <Icon svg={Icons.Config} />
                  Setting
                </FooterBar.Button>
                <FooterBar.Button
                  className="lyrixi-flex-1"
                  variant="filled"
                  color="default"
                  onClick={() => {
                    console.log('reset')
                  }}
                >
                  Reset
                </FooterBar.Button>
                <FooterBar.Button
                  className="lyrixi-flex-1"
                  variant="solid"
                  color="primary"
                  onClick={() => {
                    console.log('confirm')
                    onClose?.()
                  }}
                >
                  Ok
                </FooterBar.Button>
              </FooterBar>
            </Page.Footer>
          )}
        >
          <div style={{ height: '300px' }}>Content</div>
        </Modal.FilterModal>
      </Page.Main>
    </Page>
  )
}

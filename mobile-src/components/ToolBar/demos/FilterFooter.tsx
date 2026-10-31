import React from 'react'
import { FooterBar, Icons, Button } from 'lyrixi-mobile'

interface FilterFooterProps {
  onClose?: () => void
}

export default function FilterFooter({ onClose }: FilterFooterProps) {
  return (
    <FooterBar>
      <FooterBar.Button
        maskStyle={{ zIndex: 12 }}
        direction="vertical"
        fontSize="12px"
        list={[
          { id: 'option1', name: 'Option 1' },
          { id: 'option2', name: 'Option 2' }
        ]}
        onChange={(item) => {
          console.log(item)
        }}
        style={{ fontSize: '12px', flex: 'none', padding: '0 12px' }}
      >
        <Button.Icon svg={Icons.ThreeDots} size="xxxs" />
        <Button.Text>More</Button.Text>
      </FooterBar.Button>
      <FooterBar.Button
        direction="vertical"
        fontSize="12px"
        onClick={(e) => {
          console.log(e)
        }}
        style={{ fontSize: '12px', flex: 'none', padding: '0 12px' }}
      >
        <Button.Icon svg={Icons.Config} />
        <Button.Text>Config</Button.Text>
      </FooterBar.Button>
      <FooterBar.Button
        block
        variant="filled"
        color="default"
        onClick={(e) => {
          console.log(e)
        }}
      >
        Cancel
      </FooterBar.Button>
      <FooterBar.Button
        block
        variant="solid"
        color="primary"
        onClick={(e) => {
          console.log(e)
          onClose?.()
        }}
      >
        Ok
      </FooterBar.Button>
    </FooterBar>
  )
}

import React from 'react'
import { Icon, Page, Divider, FooterBar, Button, Icons } from 'lyrixi-mobile'

export default function FooterBarButtonDemo() {
  return (
    <Page safeArea>
      <Page.Main>
        <Divider>Text Button</Divider>
        <FooterBar>
          <FooterBar.Button
            block
            list={[
              { id: 'option1', name: 'Option 1' },
              { id: 'option2', name: 'Option 2' }
            ]}
            onChange={(item) => {
              console.log(item)
            }}
          >
            <Icon svg={Icons.ThreeDots} size="xxxs" />
          </FooterBar.Button>

          <FooterBar.Button
            block
            onClick={(e) => {
              console.log(e)
            }}
          >
            <Icon svg={Icons.Config} size="xxxs" />
          </FooterBar.Button>

          <FooterBar.Button
            block
            color="primary"
            onClick={(e) => {
              console.log(e)
            }}
          >
            Ok
          </FooterBar.Button>

          <FooterBar.Button
            block
            size="s"
            onClick={(e) => {
              console.log(e)
            }}
          >
            Cancel
          </FooterBar.Button>
        </FooterBar>

        <Divider>Text Button disabled</Divider>
        <FooterBar>
          <FooterBar.Button
            disabled
            block
            list={[
              { id: 'option1', name: 'Option 1' },
              { id: 'option2', name: 'Option 2' }
            ]}
            onChange={(item) => {
              console.log(item)
            }}
          >
            <Icon svg={Icons.ThreeDots} size="xxxs" />
          </FooterBar.Button>

          <FooterBar.Button
            disabled
            block
            onClick={(e) => {
              console.log(e)
            }}
          >
            <Icon svg={Icons.Config} size="xxxs" />
          </FooterBar.Button>

          <FooterBar.Button
            disabled
            block
            color="primary"
            size="s"
            onClick={(e) => {
              console.log(e)
            }}
          >
            Ok
          </FooterBar.Button>

          <FooterBar.Button
            disabled
            block
            size="s"
            onClick={(e) => {
              console.log(e)
            }}
          >
            Cancel
          </FooterBar.Button>
        </FooterBar>

        <Divider>Button</Divider>
        <FooterBar>
          <FooterBar.Button
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
            }}
          >
            Ok
          </FooterBar.Button>
        </FooterBar>

        <Divider>Button disabled</Divider>
        <FooterBar>
          <FooterBar.Button
            disabled
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
            disabled
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
            disabled
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
            disabled
            block
            variant="solid"
            color="primary"
            onClick={(e) => {
              console.log(e)
            }}
          >
            Ok
          </FooterBar.Button>
        </FooterBar>
      </Page.Main>
    </Page>
  )
}

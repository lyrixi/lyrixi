import React from 'react'
import { Page, NavBar, Divider, Button, Icon, Icons, Toast } from 'lyrixi-mobile'

export default function NavBarDemo() {
  return (
    <Page className="lyrixi-full lyrixi-bg-white">
      <Page.Main>
        <Divider>onBack</Divider>
        <NavBar title="Title" onBack={() => Toast.open({ content: 'Back clicked' })} />

        <Divider>Title NavBar</Divider>
        <NavBar
          title="Title"
          leftRender={() => (
            <>
              <NavBar.Button>
                <Button.Icon svg={Icons.ArrowLeft} />
                <Button.Text>Back</Button.Text>
              </NavBar.Button>
              <NavBar.Button>
                <Button.Text>Close</Button.Text>
              </NavBar.Button>
            </>
          )}
          rightRender={() => <NavBar.Button color="primary">Save</NavBar.Button>}
        />

        <Divider>Modal NavBar</Divider>
        <NavBar
          title="Title"
          leftRender={() => (
            <NavBar.Button>
              <Icon
                svg={Icons.Close}
                style={{ padding: 5 }}
                radius="100%"
                size="20px"
                variant="filled"
                color="default"
              />
            </NavBar.Button>
          )}
          rightRender={() => <NavBar.Button color="primary">Ok</NavBar.Button>}
        />

        <Divider>Icon</Divider>
        <NavBar
          leftRender={() => (
            <NavBar.Button>
              <Icon
                svg={Icons.Close}
                style={{ padding: 5 }}
                radius="100%"
                size="20px"
                variant="filled"
                color="default"
              />
            </NavBar.Button>
          )}
          rightRender={() => (
            <NavBar.Button>
              <Button.Icon
                svg={Icons.ThreeDots}
                style={{ padding: 5 }}
                radius="100%"
                size="20px"
                variant="filled"
                color="default"
              />
              <Button.Text>More</Button.Text>
            </NavBar.Button>
          )}
        />
      </Page.Main>
    </Page>
  )
}

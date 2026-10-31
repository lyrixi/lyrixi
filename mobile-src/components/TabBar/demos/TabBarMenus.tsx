import React, { useState } from 'react'
import { Page, Divider, TabBar, Icon, Icons, type TabBarItem } from 'lyrixi-mobile'

export default function TabBarMenusDemo() {
  const list = [
    {
      id: 'Fruit',
      name: 'Fruit'
    },
    { id: 'Vegetable', name: 'Vegetable' },
    { id: 'Animal', name: 'Animal' }
  ]
  const [value, setValue] = useState<TabBarItem>({ name: 'Vegetable', id: 'Vegetable' })

  function handleChange(next: TabBarItem) {
    setValue(next)
  }
  return (
    <Page>
      <Page.Main style={{ backgroundColor: 'white' }}>
        <Divider>Common</Divider>
        <TabBar.Menus
          list={[
            {
              id: 'Fruit',
              name: 'Fruit'
            },
            {
              id: 'Vegetable',
              name: 'Vegetable'
            },
            { id: 'Animal', name: 'Animal' }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <Divider>Separator</Divider>
        <TabBar.Menus
          separator="|"
          list={list}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <Divider>Disabled Item</Divider>
        <TabBar.Menus
          list={[
            {
              id: 'Fruit',
              name: 'Fruit'
            },
            {
              id: 'Vegetable',
              name: 'Vegetable',
              disabled: true
            },
            { id: 'Animal', name: 'Animal' }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <Divider>Disabled</Divider>
        <TabBar.Menus
          disabled
          list={[
            {
              id: 'Fruit',
              name: 'Fruit'
            },
            {
              id: 'Vegetable',
              name: 'Vegetable'
            },
            { id: 'Animal', name: 'Animal' }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <Divider>Icon</Divider>
        <TabBar.Menus
          list={[
            {
              iconSvg: Icons.FileText,
              id: 'Fruit',
              name: 'Fruit'
            },
            {
              iconSvg: Icons.FileText,
              id: 'Vegetable',
              name: 'Vegetable'
            },
            {
              iconSvg: Icons.FileText,
              id: 'Animal',
              name: 'Animal'
            }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <Divider>Icon Size & Color</Divider>
        <TabBar.Menus
          list={[
            {
              iconSvg: Icons.FileText,
              iconSize: 's',
              iconColor: 'primary',
              id: 'Fruit',
              name: 'Fruit'
            },
            {
              iconSvg: Icons.FileText,
              iconSize: 's',
              iconColor: 'success',
              id: 'Vegetable',
              name: 'Vegetable'
            },
            {
              iconSvg: Icons.FileText,
              iconSize: 's',
              iconColor: 'danger',
              id: 'Animal',
              name: 'Animal'
            }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <Divider>Icon Render</Divider>
        <TabBar.Menus
          list={[
            {
              id: 'Fruit',
              name: 'Fruit',
              iconRender: ({ checked }) => (
                <Icon svg={Icons.FileText} size="xs" color={checked ? 'primary' : 'default'} />
              )
            },
            {
              id: 'Vegetable',
              name: 'Vegetable',
              iconRender: ({ checked }) => (
                <Icon svg={Icons.FileText} size="xs" color={checked ? 'primary' : 'default'} />
              )
            },
            {
              id: 'Animal',
              name: 'Animal',
              iconRender: ({ checked }) => (
                <Icon svg={Icons.FileText} size="xs" color={checked ? 'primary' : 'default'} />
              )
            }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <Divider>Content</Divider>
        <TabBar.Menus
          list={[
            {
              iconSvg: Icons.FileText,
              id: 'Fruit',
              name: 'Fruit',
              description: 'description',
              // eslint-disable-next-line
              contentRender: ({ checked }) => (
                <div className="lyrixi-tabbar-group-tab-content">content</div>
              )
            },
            {
              iconSvg: Icons.FileText,
              id: 'Vegetable',
              name: 'Vegetable',
              description: 'description',
              // eslint-disable-next-line
              contentRender: ({ checked }) => (
                <div className="lyrixi-tabbar-group-tab-content">content</div>
              )
            },
            {
              iconSvg: Icons.FileText,
              id: 'Animal',
              name: 'Animal',
              description: 'description',
              // eslint-disable-next-line
              contentRender: ({ checked }) => (
                <div className="lyrixi-tabbar-group-tab-content">content</div>
              )
            }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <Divider>Description Top</Divider>
        <TabBar.Menus
          descriptionPlacement="top"
          list={[
            {
              iconSvg: Icons.FileText,
              id: 'Fruit',
              name: 'Fruit',
              description: 'description'
            },
            {
              iconSvg: Icons.FileText,
              id: 'Vegetable',
              name: 'Vegetable',
              description: 'description'
            },
            {
              iconSvg: Icons.FileText,
              id: 'Animal',
              name: 'Animal',
              description: 'description'
            }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <Divider>Size</Divider>
        <TabBar.Menus
          list={[
            {
              iconSvg: Icons.FileText,
              id: 'Fruit',
              name: 'Fruit',
              description: 'description'
            },
            {
              iconSvg: Icons.FileText,
              id: 'Vegetable',
              name: 'Vegetable',
              description: 'description'
            },
            {
              iconSvg: Icons.FileText,
              id: 'Animal',
              name: 'Animal',
              description: 'description'
            }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
          size="s"
        />
        <br />
        <TabBar.Menus
          list={[
            {
              iconSvg: Icons.FileText,
              id: 'Fruit',
              name: 'Fruit',
              description: 'description'
            },
            {
              iconSvg: Icons.FileText,
              id: 'Vegetable',
              name: 'Vegetable',
              description: 'description'
            },
            {
              iconSvg: Icons.FileText,
              id: 'Animal',
              name: 'Animal',
              description: 'description'
            }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
          size="m"
        />
        <br />
        <TabBar.Menus
          list={[
            {
              iconSvg: Icons.FileText,
              id: 'Fruit',
              name: 'Fruit',
              description: 'description'
            },
            {
              iconSvg: Icons.FileText,
              id: 'Vegetable',
              name: 'Vegetable',
              description: 'description'
            },
            {
              iconSvg: Icons.FileText,
              id: 'Animal',
              name: 'Animal',
              description: 'description'
            }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
          size="l"
        />

        <Divider>Placeholder</Divider>
        <TabBar.Menus
          list={[
            {
              id: 'Fruit',
              name: 'Fruit'
            },
            {
              id: 'Vegetable',
              placeholder: 'Select'
            },
            { id: 'Animal', name: 'Animal' }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <Divider>Block</Divider>
        <TabBar.Menus
          block
          list={list}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <Divider>OverFlow</Divider>
        <TabBar.Menus
          list={[
            {
              id: 'Fruit',
              name: 'Fruit'
            },
            {
              id: 'Vegetable',
              name: 'Vegetable Vegetable Vegetable Vegetable Vegetable Vegetable Vegetable Vegetable '
            },
            { id: 'Animal', name: 'Animal' }
          ]}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />
      </Page.Main>
    </Page>
  )
}

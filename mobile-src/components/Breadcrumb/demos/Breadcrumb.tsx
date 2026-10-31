import React, { useState } from 'react'
import { Page, Divider, Breadcrumb, Icons, type BreadcrumbItem } from 'lyrixi-mobile'

export default function BreadcrumbDemo() {
  const list = [
    { id: 'home', name: 'Home' },
    { id: 'list', name: 'List' },
    { id: 'detail', name: 'Detail' }
  ]
  const [value, setValue] = useState<BreadcrumbItem>({ id: 'detail', name: 'Detail' })

  function handleChange(next: BreadcrumbItem) {
    setValue(next)
  }

  return (
    <Page>
      <Page.Main style={{ backgroundColor: 'white' }}>
        <Divider>Common</Divider>
        <Breadcrumb
          list={list}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <Divider>Separator</Divider>
        <Breadcrumb
          list={list}
          value={value}
          separator={'/'}
          onChange={(newValue) => {
            console.log(newValue)
            handleChange(newValue)
          }}
        />

        <Divider>Disabled Item</Divider>
        <Breadcrumb
          list={[
            { id: 'home', name: 'Home' },
            { id: 'list', name: 'List', disabled: true },
            { id: 'detail', name: 'Detail' }
          ]}
          value={value}
          onChange={(newValue) => {
            handleChange(newValue)
          }}
        />

        <Divider>Disabled</Divider>
        <Breadcrumb
          disabled
          list={list}
          value={value}
          onChange={(newValue) => {
            handleChange(newValue)
          }}
        />

        <Divider>Icon</Divider>
        <Breadcrumb
          list={[
            { id: 'home', name: 'Home', iconSvg: Icons.FileText },
            { id: 'list', name: 'List', iconSvg: Icons.FileText },
            { id: 'detail', name: 'Detail', iconSvg: Icons.FileText }
          ]}
          value={value}
          onChange={(newValue) => {
            handleChange(newValue)
          }}
        />

        <Divider>Placeholder</Divider>
        <Breadcrumb
          list={[
            { id: 'home', name: 'Home' },
            { id: 'list', name: 'List' },
            { id: 'detail', name: 'Detail' }
          ]}
          value={value}
          onChange={(newValue) => {
            handleChange(newValue)
          }}
        />

        <Divider>Description</Divider>
        <Breadcrumb
          list={[
            { id: 'home', name: 'Home', description: 'Level 1', iconSvg: Icons.FileText },
            { id: 'list', name: 'List', description: 'Level 2' },
            { id: 'detail', name: 'Detail', description: 'Current' }
          ]}
          value={value}
          onChange={(newValue) => {
            handleChange(newValue)
          }}
        />

        <Divider>Description Top</Divider>
        <Breadcrumb
          descriptionPlacement="top"
          list={[
            { id: 'home', name: 'Home', description: 'Level 1' },
            { id: 'list', name: 'List', description: 'Level 2' },
            { id: 'detail', name: 'Detail', description: 'Current' }
          ]}
          value={value}
          onChange={(newValue) => {
            handleChange(newValue)
          }}
        />

        <Divider>Size</Divider>
        <Breadcrumb list={list} value={value} size="s" />
        <br />
        <Breadcrumb list={list} value={value} size="m" />
        <br />
        <Breadcrumb list={list} value={value} size="l" />

        <Divider>Text Separator</Divider>
        <Breadcrumb
          list={list}
          value={value}
          separator="/"
          onChange={(newValue) => {
            handleChange(newValue)
          }}
        />

        <Divider>OverFlow</Divider>
        <Breadcrumb
          list={[
            { id: 'home', name: 'Home' },
            {
              id: 'list',
              name: 'List List List List List List List List List List List List List List'
            },
            { id: 'detail', name: 'Detail' }
          ]}
          value={value}
          onChange={(newValue) => {
            handleChange(newValue)
          }}
        />
      </Page.Main>
    </Page>
  )
}

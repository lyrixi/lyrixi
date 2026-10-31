import React, { useState } from 'react'
import { Page, Divider, Switch } from 'lyrixi-mobile'

export default function SwitchDemo() {
  const [checked, setChecked] = useState(false)
  return (
    <Page>
      <Page.Main>
        <Divider>Size xxxs</Divider>
        <Switch size="xxxs" checked={checked} onChange={setChecked} />
        <Switch size="xxxs" checked={checked} on="On On On On" off="Off" onChange={setChecked} />
        <Divider>Size xxs</Divider>
        <Switch size="xxs" checked={checked} onChange={setChecked} />
        <Switch size="xxs" checked={checked} on="On On On On" off="Off" onChange={setChecked} />
        <Divider>Size xs</Divider>
        <Switch size="xs" checked={checked} onChange={setChecked} />
        <Switch size="xs" checked={checked} on="On On On On" off="Off" onChange={setChecked} />
        <Divider>Size s</Divider>
        <Switch size="s" checked={checked} onChange={setChecked} />
        <Switch size="s" checked={checked} on="On On On On" off="Off" onChange={setChecked} />
        <Divider>Size m</Divider>
        <Switch checked={checked} onChange={setChecked} />
        <Switch checked={checked} on="On On On On" off="Off" onChange={setChecked} />
        <Divider>Size l</Divider>
        <Switch size="l" checked={checked} onChange={setChecked} />
        <Switch size="l" checked={checked} on="On On On On" off="Off" onChange={setChecked} />
        <Divider>Size xl</Divider>
        <Switch size="xl" checked={checked} onChange={setChecked} />
        <Switch size="xl" checked={checked} on="On On On On" off="Off" onChange={setChecked} />
        <Divider>Size xxl</Divider>
        <Switch size="xxl" checked={checked} onChange={setChecked} />
        <Switch size="xxl" checked={checked} on="On On On On" off="Off" onChange={setChecked} />
        <Divider>Size xxxl</Divider>
        <Switch size="xxxl" checked={checked} onChange={setChecked} />
        <Switch size="xxxl" checked={checked} on="On On On On" off="Off" onChange={setChecked} />
      </Page.Main>
    </Page>
  )
}

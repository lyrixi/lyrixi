import React, { useState } from 'react'
import { Page, Card, Divider, Input, Keyboard } from 'lyrixi-mobile'

export default function KeyboardNumberDemo() {
  const [open1, setOpen1] = useState(false)
  const [value1, setValue1] = useState('')
  const [open2, setOpen2] = useState(false)
  const [value2, setValue2] = useState('')
  const [open3, setOpen3] = useState(false)
  const [value3, setValue3] = useState('')
  const [open4, setOpen4] = useState(false)
  const [value4, setValue4] = useState('')
  const [open5, setOpen5] = useState(false)
  const [value5, setValue5] = useState('')
  const [open6, setOpen6] = useState(false)
  const [value6, setValue6] = useState('')
  const [openFull, setOpenFull] = useState(false)
  const [valueFull, setValueFull] = useState('')
  const [openSideDelete, setOpenSideDelete] = useState(false)
  const [valueSideDelete, setValueSideDelete] = useState('')
  const [openSideOk, setOpenSideOk] = useState(false)
  const [valueSideOk, setValueSideOk] = useState('')

  return (
    <Page>
      <Page.Main>
        <Card>
          <Divider>所有按键（小数点、负号、删除、确认、取消）</Divider>
          <Input.Text
            value={valueFull}
            placeholder="点击输入，展示完整键盘"
            onClick={() => setOpenFull(true)}
            onChange={(v) => setValueFull(String(v ?? ''))}
          />
          <Keyboard.Number
            open={openFull}
            value={valueFull}
            onChange={(v) => setValueFull(v)}
            dot
            minus
            okVisible
            cancelVisible
            onOk={(val) => {
              setValueFull(val)
              return true
            }}
            onCancel={() => setOpenFull(false)}
            onClose={() => setOpenFull(false)}
          />
        </Card>

        <Card>
          <Divider>主区删除键（默认布局）</Divider>
          <Input.Text
            value={value1}
            placeholder="删除键在最后一行右侧"
            onClick={() => setOpen1(true)}
            onChange={(v) => setValue1(String(v ?? ''))}
          />
          <Keyboard.Number
            open={open1}
            value={value1}
            onChange={(v) => setValue1(v)}
            onClose={() => setOpen1(false)}
          />
        </Card>

        <Card>
          <Divider>侧边删除键（dot + minus）</Divider>
          <Input.Text
            value={valueSideDelete}
            placeholder="同时有小数点与负号时，删除键在侧边"
            onClick={() => setOpenSideDelete(true)}
            onChange={(v) => setValueSideDelete(String(v ?? ''))}
          />
          <Keyboard.Number
            open={openSideDelete}
            value={valueSideDelete}
            onChange={(v) => setValueSideDelete(v)}
            dot
            minus
            onClose={() => setOpenSideDelete(false)}
          />
        </Card>

        <Card>
          <Divider>侧边确定键（okVisible）</Divider>
          <Input.Text
            value={valueSideOk}
            placeholder="传 okVisible 时，确定键与删除键均在侧边"
            onClick={() => setOpenSideOk(true)}
            onChange={(v) => setValueSideOk(String(v ?? ''))}
          />
          <Keyboard.Number
            open={openSideOk}
            value={valueSideOk}
            onChange={(v) => setValueSideOk(v)}
            okVisible
            onOk={(val) => {
              setValueSideOk(val)
              return true
            }}
            onClose={() => setOpenSideOk(false)}
          />
        </Card>

        <Card>
          <Divider>dot（小数点）</Divider>
          <Input.Text
            value={value2}
            placeholder="带小数点的数字"
            onClick={() => setOpen2(true)}
            onChange={(v) => setValue2(String(v ?? ''))}
          />
          <Keyboard.Number
            open={open2}
            value={value2}
            onChange={(v) => setValue2(v)}
            dot
            onClose={() => setOpen2(false)}
          />
        </Card>

        <Card>
          <Divider>minus（负号）</Divider>
          <Input.Text
            value={value3}
            placeholder="可输入负数"
            onClick={() => setOpen3(true)}
            onChange={(v) => setValue3(String(v ?? ''))}
          />
          <Keyboard.Number
            open={open3}
            value={value3}
            onChange={(v) => setValue3(v)}
            minus
            onClose={() => setOpen3(false)}
          />
        </Card>

        <Card>
          <Divider>okVisible / ok / onOk（自定义确定文案）</Divider>
          <Input.Text
            value={value4}
            placeholder="自定义确定按钮文案"
            onClick={() => setOpen4(true)}
            onChange={(v) => setValue4(String(v ?? ''))}
          />
          <Keyboard.Number
            open={open4}
            value={value4}
            onChange={(v) => setValue4(v)}
            okVisible
            ok={<span>完成</span>}
            onOk={(val) => {
              setValue4(val)
              return true
            }}
            onClose={() => setOpen4(false)}
          />
        </Card>

        <Card>
          <Divider>cancelVisible / cancel / onCancel</Divider>
          <Input.Text
            value={value5}
            placeholder="带取消按钮"
            onClick={() => setOpen5(true)}
            onChange={(v) => setValue5(String(v ?? ''))}
          />
          <Keyboard.Number
            open={open5}
            value={value5}
            onChange={(v) => setValue5(v)}
            cancelVisible
            cancel={<span>收起</span>}
            onCancel={() => setOpen5(false)}
            onClose={() => setOpen5(false)}
          />
        </Card>

        <Card>
          <Divider>safeArea / modalStyle / modalClassName / onOpen</Divider>
          <Input.Text
            value={value6}
            placeholder="自定义样式与事件"
            onClick={() => setOpen6(true)}
            onChange={(v) => setValue6(String(v ?? ''))}
          />
          <Keyboard.Number
            open={open6}
            value={value6}
            onChange={(v) => setValue6(v)}
            safeArea
            modalStyle={{ borderRadius: '12px 12px 0 0' }}
            modalClassName="lyrixi-keyboard-demo-custom"
            onClose={() => setOpen6(false)}
          />
        </Card>
      </Page.Main>
    </Page>
  )
}

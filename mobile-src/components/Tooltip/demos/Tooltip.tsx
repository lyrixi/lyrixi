import React from 'react'
import { Page, Tooltip, Button, type ModalAnimation } from 'lyrixi-mobile'

const contentStyle = {
  padding: '8px 12px',
  whiteSpace: 'nowrap' as const
}

const positions: Array<{
  label: string
  animation: ModalAnimation
  style: React.CSSProperties
}> = [
  { label: '左上', animation: 'slideDownLeft', style: { top: 12, left: 12 } },
  {
    label: '上中',
    animation: 'slideDown',
    style: { top: 12, left: '50%', transform: 'translateX(-50%)' }
  },
  { label: '右上', animation: 'slideDownRight', style: { top: 12, right: 12 } },
  {
    label: '左中',
    animation: 'slideDownLeft',
    style: { top: '50%', left: 12, transform: 'translateY(-50%)' }
  },
  {
    label: '右中',
    animation: 'slideDownRight',
    style: { top: '50%', right: 12, transform: 'translateY(-50%)' }
  },
  { label: '左下', animation: 'slideUpLeft', style: { bottom: 12, left: 12 } },
  {
    label: '下中',
    animation: 'slideUp',
    style: { bottom: 12, left: '50%', transform: 'translateX(-50%)' }
  },
  { label: '右下', animation: 'slideUpRight', style: { bottom: 12, right: 12 } }
]

export default function TooltipDemo() {
  return (
    <Page>
      <Page.Header className="lyrixi-text-center">Tooltip</Page.Header>
      <Page.Main className="lyrixi-bg-white">
        <div
          style={{
            position: 'relative',
            height: '100%',
            padding: 12,
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--lyrixi-font-color-secondary)',
              fontSize: 14,
              pointerEvents: 'none',
              textAlign: 'center',
              padding: 24
            }}
          >
            点击边缘按钮
            <br />
            查看不同位置的 Tooltip 定位
          </div>

          {positions.map((item) => (
            <div key={item.label} style={{ position: 'absolute', ...item.style }}>
              <Tooltip
                animation={item.animation}
                modalRender={() => (
                  <div style={contentStyle}>
                    {item.label} · {item.animation}
                  </div>
                )}
              >
                <Button variant="solid" color="primary" radius="m">
                  {item.label}
                </Button>
              </Tooltip>
            </div>
          ))}
        </div>
      </Page.Main>
    </Page>
  )
}

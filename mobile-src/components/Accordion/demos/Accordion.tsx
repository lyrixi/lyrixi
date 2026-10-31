import React, { useRef } from 'react'
import {
  Divider,
  Page,
  Card,
  Button,
  Accordion,
  Icon,
  Icons,
  type AccordionRef
} from 'lyrixi-mobile'

const contentStyle = { height: 100 }

function AccordionContent({ text }: { text: string }) {
  return (
    <div
      className="lyrixi-flex lyrixi-flex-justify-center lyrixi-flex-align-center lyrixi-border-b"
      style={contentStyle}
    >
      {text}
    </div>
  )
}

export default function AccordionDemo() {
  const accordionRef = useRef<AccordionRef | null>(null)

  return (
    <Page>
      <Page.Main>
        <Card>
          <Divider>title（标题模式）</Divider>
          <div style={{ margin: '0 12px' }}>
            <Accordion title="Panel Title">
              <AccordionContent text="Click header to expand or collapse." />
            </Accordion>
          </div>
        </Card>

        <Card>
          <Divider>ellipsis（展开/收起文案）</Divider>
          <div style={{ margin: '0 12px' }}>
            <Accordion ellipsis={{ expandText: 'View More', collapseText: 'Collapse' }}>
              <AccordionContent text="Content with expand/collapse text at the bottom." />
            </Accordion>
          </div>
        </Card>

        <Card>
          <Divider>minHeight（折叠时保留高度）</Divider>
          <div style={{ margin: '0 12px' }}>
            <Accordion
              defaultOpen={false}
              minHeight={60}
              ellipsis={{ expandText: 'Expand', collapseText: 'Collapse' }}
            >
              <AccordionContent text="Content keeps 60px visible when collapsed." />
            </Accordion>
          </div>
        </Card>

        <Card>
          <Divider>arrowPlacement（箭头位置）</Divider>
          <div style={{ margin: '0 12px' }}>
            <Accordion title="Arrow on Left" arrowPlacement="left" style={{ marginBottom: 12 }}>
              <AccordionContent text="Arrow appears on the left of the title." />
            </Accordion>
            <Accordion title="Arrow on Right" arrowPlacement="right">
              <AccordionContent text="Arrow appears on the right of the title (default)." />
            </Accordion>
          </div>
        </Card>

        <Card>
          <Divider>ref.open / ref.close</Divider>
          <div className="lyrixi-flex" style={{ margin: '0 12px 12px', gap: 8 }}>
            <Button color="primary" onClick={() => accordionRef.current?.open()}>
              Open Panel
            </Button>
            <Button onClick={() => accordionRef.current?.close()}>Close Panel</Button>
          </div>
          <div style={{ margin: '0 12px' }}>
            <Accordion ref={accordionRef} title="Ref Panel">
              <AccordionContent text="Expanded state is controlled via ref.open / ref.close." />
            </Accordion>
          </div>
        </Card>

        <Card>
          <Divider>headerRender（自定义头部）</Divider>
          <div style={{ margin: '0 12px' }}>
            <Accordion
              headerRender={({ open, onClick }) => (
                <div
                  className="lyrixi-flex lyrixi-flex-align-center lyrixi-flex-justify-between"
                  style={{
                    padding: '12px',
                    background: '#f5f5f5',
                    cursor: 'pointer'
                  }}
                  onClick={onClick}
                >
                  <span style={{ fontWeight: 600 }}>Custom Header</span>
                  <span style={{ color: '#1677ff' }}>{open ? 'Collapse' : 'Expand'}</span>
                </div>
              )}
            >
              <AccordionContent text="Header is fully customized via headerRender." />
            </Accordion>
          </div>
        </Card>

        <Card>
          <Divider>ellipsisRender（自定义底部）</Divider>
          <div style={{ margin: '0 12px' }}>
            <Accordion
              defaultOpen={false}
              ellipsisRender={({ open, onClick }) => (
                <div
                  className="lyrixi-flex lyrixi-flex-justify-center"
                  style={{
                    padding: '8px 0',
                    color: '#f90',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                  onClick={onClick}
                >
                  <Icon
                    svg={Icons.StarFill}
                    size="xxxs"
                    style={{ marginRight: '4px', color: '#f90' }}
                  />
                  {open ? 'Hide Content' : 'Show Content'}
                </div>
              )}
            >
              <AccordionContent text="Custom ellipsis render at the bottom." />
            </Accordion>
          </div>
        </Card>

        <Card>
          <Divider>arrowRender（自定义箭头）</Divider>
          <div style={{ margin: '0 12px' }}>
            <Accordion
              title="Custom Arrow"
              arrowRender={({ open }) => (
                <Icon
                  svg={open ? Icons.ArrowUp : Icons.ArrowDown}
                  size="xxxs"
                  style={{ color: '#1677ff' }}
                />
              )}
            >
              <AccordionContent text="Arrow icon is customized via arrowRender." />
            </Accordion>
          </div>
        </Card>
      </Page.Main>
    </Page>
  )
}

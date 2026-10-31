import React, { useState } from 'react'
import { Divider, Page, Card, Button, Accordion } from 'lyrixi-mobile'

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

export default function AccordionGroupDemo() {
  const [value, setValue] = useState<number | null>(null)

  return (
    <Page>
      <Page.Main>
        <Card>
          <Divider>基础用法（非受控）</Divider>
          <Accordion.Group style={{ margin: '0 12px' }}>
            <Accordion title="First Panel">
              <AccordionContent text="Only one panel can be expanded at a time." />
            </Accordion>
            <Accordion title="Second Panel">
              <AccordionContent text="Opening another panel closes the previous one." />
            </Accordion>
            <Accordion title="Third Panel">
              <AccordionContent text="Click the same panel again to collapse it." />
            </Accordion>
          </Accordion.Group>
        </Card>

        <Card>
          <Divider>ellipsis 模式</Divider>
          <Accordion.Group style={{ margin: '0 12px' }}>
            <Accordion ellipsis={{ expandText: 'View More', collapseText: 'Collapse' }}>
              <AccordionContent text="First panel content." />
            </Accordion>
            <Accordion ellipsis={{ expandText: 'View More', collapseText: 'Collapse' }}>
              <AccordionContent text="Second panel content." />
            </Accordion>
            <Accordion ellipsis={{ expandText: 'View More', collapseText: 'Collapse' }}>
              <AccordionContent text="Third panel content." />
            </Accordion>
          </Accordion.Group>
        </Card>

        <Card>
          <Divider>value / onChange（受控）</Divider>
          <Button
            className="lyrixi-flex"
            color="primary"
            style={{ margin: '0 12px 12px' }}
            onClick={() => {
              setValue((prev) => (prev === 2 ? null : 2))
            }}
          >
            {value === 2 ? 'Close Third Panel' : 'Open Third Panel'}
          </Button>
          <Accordion.Group value={value} style={{ margin: '0 12px' }} onChange={setValue}>
            <Accordion title="First Panel">
              <AccordionContent text="Controlled group: index 0." />
            </Accordion>
            <Accordion title="Second Panel">
              <AccordionContent text="Controlled group: index 1." />
            </Accordion>
            <Accordion title="Third Panel">
              <AccordionContent text="Controlled group: index 2." />
            </Accordion>
            <Accordion title="Fourth Panel">
              <AccordionContent text="Controlled group: index 3." />
            </Accordion>
          </Accordion.Group>
        </Card>
      </Page.Main>
    </Page>
  )
}

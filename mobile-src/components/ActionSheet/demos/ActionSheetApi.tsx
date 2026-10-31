import React from 'react'
import { Page, ActionSheet, Button, type ListItem } from 'lyrixi-mobile'

const list: ListItem[] = [
  { id: '1', name: 'Option 1' },
  { id: '2', name: 'Option 2' },
  { id: '3', name: 'Option 3' }
]

export default function ActionSheetApiDemo() {
  const handleOpen = () => {
    ActionSheet.open({
      list,
      title: 'Title',
      onChange: (value) => {
        console.log('onChange:', value)
      },
      onClose: () => {
        console.log('onClose')
      }
    })
  }

  const handleOpenWithCancel = () => {
    ActionSheet.open({
      list,
      title: 'With Cancel',
      cancelVisible: true,
      onChange: (value) => {
        console.log('onChange:', value)
      },
      onCancel: () => {
        console.log('onCancel')
      }
    })
  }

  const handleClose = () => {
    ActionSheet.close()
  }

  const handleOpenMultiple = () => {
    ActionSheet.open({
      list,
      title: 'First ActionSheet'
    })

    window.setTimeout(() => {
      ActionSheet.open({
        list,
        title: 'Second ActionSheet'
      })
    }, 3000)

    window.setTimeout(() => {
      ActionSheet.close()
    }, 6000)
  }

  return (
    <Page>
      <Page.Main>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button className="lyrixi-flex" color="primary" onClick={handleOpen}>
            Open ActionSheet
          </Button>

          <Button className="lyrixi-flex" color="info" onClick={handleOpenWithCancel}>
            Open ActionSheet (With Cancel)
          </Button>

          <Button className="lyrixi-flex" color="danger" onClick={handleClose}>
            Close Current ActionSheet
          </Button>

          <Button className="lyrixi-flex" color="warning" onClick={handleOpenMultiple}>
            Open Multiple ActionSheets (3s replace, 3s close)
          </Button>
        </div>
      </Page.Main>
    </Page>
  )
}

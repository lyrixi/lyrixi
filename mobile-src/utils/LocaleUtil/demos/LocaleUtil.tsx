import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Page, LocaleUtil, Card, Button } from 'lyrixi-mobile'

export default function LocaleUtilDemo() {
  const [currentLanguage, setCurrentLanguage] = useState<string | null>(null)

  // 初始化国际化
  async function initLocale(language = 'en_US') {
    let newResult = await LocaleUtil.loadLocale(language)
    if (newResult.status === 'success') {
      console.log('加载成功')
      setCurrentLanguage(language)
    } else {
      console.log('加载失败')
    }
  }

  // 切换语言
  async function switchLanguage(language: string) {
    await initLocale(language)
  }

  useEffect(() => {
    initLocale()
  }, [])

  if (!currentLanguage) {
    return null
  }

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>Node with variables</Card.Header>
          <Card.Main>
            {LocaleUtil.locale('近{0}日', 'lyrixi_7243810e4577ec95db8f7315c52ebe66', [
              <span key={'0'} style={{ color: 'red' }}>
                7
              </span>
            ])}
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>String with variables</Card.Header>
          <Card.Main>
            {LocaleUtil.locale('近{0}日', 'lyrixi_7243810e4577ec95db8f7315c52ebe66', ['7'])}
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>No key use static value</Card.Header>
          <Card.Main>{LocaleUtil.locale('近{0}日', '', ['7'])}</Card.Main>
        </Card>

        <Card>
          <Card.Header>No key and value use mark(Node)</Card.Header>
          <Card.Main>{LocaleUtil.locale(<div>Node</div>)}</Card.Main>
        </Card>

        <Card>
          <Card.Header>No key and value use mark(Number)</Card.Header>
          <Card.Main>{LocaleUtil.locale(7)}</Card.Main>
        </Card>

        <Card>
          <Card.Header>Dayjs locale</Card.Header>
          <Card.Main>{dayjs().format('YYYY-wo')}</Card.Main>
        </Card>
      </Page.Main>
      <Page.Footer>
        <Button onClick={() => switchLanguage('zh_CN')}>中文</Button>
        <Button onClick={() => switchLanguage('en_US')}>English</Button>
      </Page.Footer>
    </Page>
  )
}

import React from 'react'
import { Page, List } from 'lyrixi-mobile'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'

type PageDemoRow = { id: number; name: string }

const list: PageDemoRow[] = []
for (let i = 0; i < 100; i++) {
  list.push({
    id: i,
    name: '测试数据' + i
  })
}

export default function RefreshDemo() {
  function handleTopRefresh() {
    console.log('onTopRefresh')
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('自定义提示')
      }, 1000)
    })
  }
  function handleBottomRefresh() {
    console.log('底部加载')
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }
  return (
    <Page safeArea>
      <Page.Header style={{ height: 50, backgroundColor: 'white' }}>Header</Page.Header>
      <Page.Main
        onTopRefresh={handleTopRefresh}
        onBottomRefresh={handleBottomRefresh}
        touchStopPropagation={false}
      >
        <Swiper
          spaceBetween={50}
          style={{ height: '200px' }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper: SwiperType) => console.log(swiper)}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
        {list.map((item, index) => {
          return (
            <div key={index} style={{ height: 40 }}>
              {item.name}
            </div>
          )
        })}
        <List.InfiniteScroll />
      </Page.Main>
      <Page.Footer
        onChange={(newValue) => {
          console.log(newValue)
        }}
        buttons={[
          {
            id: 'ok',
            name: 'Ok',
            primary: true
          }
        ]}
      />
    </Page>
  )
}

import React, { useRef } from 'react'
import { Page, VideoPlayer, Button, type VideoPlayerRef } from 'lyrixi-mobile'

export default function VideoPlayerDemo() {
  const videoPlayerRef = useRef<VideoPlayerRef | null>(null)
  return (
    <Page>
      <Page.Main>
        <VideoPlayer
          ref={videoPlayerRef}
          poster={'https://lyrixi.github.io/lyrixi/assets/images/logo.png'}
          src={'https://lyrixi.github.io/lyrixi/assets/test/1.mp4'}
          autoPlay={false}
          headerRender={() => (
            <div
              className="lyrixi-videoplayer-header-close"
              onClick={() => {
                alert('close')
              }}
            ></div>
          )}
        />
      </Page.Main>
      <Page.Footer>
        <Button
          onClick={() => {
            videoPlayerRef.current?.play()
          }}
        >
          Play
        </Button>
        <Button
          onClick={() => {
            videoPlayerRef.current?.pause()
          }}
        >
          Pause
        </Button>
      </Page.Footer>
    </Page>
  )
}

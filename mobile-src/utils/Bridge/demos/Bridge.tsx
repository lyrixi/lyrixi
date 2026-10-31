import React, { useRef, useEffect } from 'react'
import vconsole from 'vconsole'

import {
  Loading,
  Button,
  Device,
  Bridge,
  Message,
  Page,
  Divider,
  Card,
  type SuccessResult,
  type ErrorResult,
  type CancelResult,
  type BridgeScanCodeResultData,
  type BridgeChooseMediaResultData,
  type BridgeGetLocationResultData
} from 'lyrixi-mobile'

new vconsole()

function preventBack() {
  Bridge.onBack({
    onSuccess: () => {
      Message.open({
        content: 'Are you sure to close this window?',
        buttonsDirection: 'horizontal',
        buttons: [
          {
            name: 'Cancel',
            onClick: () => {
              preventBack()
              return true
            }
          },
          {
            name: 'Sure',
            color: 'primary',
            onClick: () => {
              Bridge.navigateBack()
              return true
            }
          }
        ]
      })
      return false
    }
  })
}

export default function BridgeDemo() {
  const imageLocalFiles = useRef<unknown[] | null>(null)

  useEffect(() => {
    console.log('Platform', Device.platform)
    console.log('Bridge', Bridge)

    // 原 App bridgeConfig 用法：先 load SDK，再 config 鉴权
    // bridgeConfig: { getScriptSrc, getConfigUrl, formatHeaders, formatPayload, formatResponse }
    const bridgeConfig = {
      // getScriptSrc: ({ platform }: { platform: string }) => '//res.wx.qq.com/open/js/jweixin-1.6.0.js',
      // getConfigUrl: ({ platform }: { platform: string }) => '/api/jsapi/signature',
      // formatHeaders: () => ({ Authorization: 'Bearer xxx' }),
      // formatPayload: (payload: unknown) => payload,
      // formatResponse: (response: unknown) => response
    }

    Bridge.load({
      ...bridgeConfig,
      onSuccess: () => {
        Bridge.config({
          ...bridgeConfig,
          onSuccess: () => {
            Bridge.setTitle({
              title: '111'
            })
            console.log('Bridge loaded & configured')
          },
          onError: (error) => {
            console.log('Bridge config error', error)
          }
        })
      },
      onError: (error) => {
        console.log('Bridge load error', error)
      }
    })
  }, [])

  return (
    <Page>
      <Page.Main>
        <Divider>窗口接口</Divider>
        <Card>
          <Card.Header>路由跳转接口</Card.Header>
          <Card.Main>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                Bridge.navigatePush({
                  type: 'webview',
                  title: 'Test Webview',
                  url: 'https://www.baidu.com/'
                })
              }}
            >
              navigatePush
            </Button>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                Bridge.navigateReplace({
                  type: 'webview',
                  title: 'Test Webview',
                  url: 'https://www.baidu.com/'
                })
              }}
            >
              navigateReplace
            </Button>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                Bridge.navigateLaunch({
                  type: 'webview',
                  title: 'Test Webview',
                  url: 'https://www.baidu.com/'
                })
              }}
            >
              navigateLaunch
            </Button>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                Bridge.navigateBack()
              }}
            >
              navigateBack
            </Button>
          </Card.Main>
        </Card>
        <Card>
          <Card.Header>仅客户端支持</Card.Header>
          <Card.Main>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                Bridge.navigatePush({
                  type: 'native',
                  url: 'Home',
                  title: '首页',
                  onSuccess: () => console.log('navigatePush native success'),
                  onError: (error) => console.log('navigatePush native error', error)
                })
              }}
            >
              navigatePush
            </Button>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                Bridge.navigateReplace({
                  type: 'native',
                  url: 'Home',
                  title: '首页',
                  onSuccess: () => console.log('navigatePush native success'),
                  onError: (error) => console.log('navigatePush native error', error)
                })
              }}
            >
              navigateReplace
            </Button>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                Bridge.navigateLaunch({
                  type: 'native',
                  url: 'Home',
                  title: '首页',
                  onSuccess: () => console.log('navigatePush native success'),
                  onError: (error) => console.log('navigatePush native error', error)
                })
              }}
            >
              navigateLaunch
            </Button>
          </Card.Main>
        </Card>
        <Card>
          <Card.Header>监听页面返回事件(仅客户端与企微)</Card.Header>
          <Card.Main>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                preventBack()
              }}
            >
              onBack
            </Button>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>修改页面title</Card.Header>
          <Card.Main>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                Bridge.setTitle({
                  title: '自定义标题'
                })
              }}
            >
              setTitle
            </Button>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>退出至登录页面(仅客户端)</Card.Header>
          <Card.Main>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                ;(Bridge as { logOut?: () => void }).logOut?.()
              }}
            >
              logout
            </Button>
          </Card.Main>
        </Card>

        <Divider>媒体接口</Divider>
        <Card>
          <Card.Header>扫码接口</Card.Header>
          <Card.Main>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                Bridge.scanCode({
                  scanType: ['barCode', 'qrCode'],
                  onSuccess: (res: SuccessResult<BridgeScanCodeResultData>) => {
                    console.log(res)
                    alert(JSON.stringify(res))
                  },
                  onError: (error: ErrorResult) => {
                    console.log(error)
                    alert(JSON.stringify(error))
                  }
                })
              }}
            >
              scanCode
            </Button>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>拍照或从手机相册选择媒体接口(仅支持客户端,微信,企微,小程序)</Card.Header>
          <Card.Main>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                Bridge.chooseMedia({
                  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                  onSuccess: (res: SuccessResult<BridgeChooseMediaResultData>) => {
                    console.log(res)
                    alert(JSON.stringify(res))
                    imageLocalFiles.current = res.data?.localFiles ?? null
                  },
                  onError: (error: ErrorResult) => {
                    console.log(error)
                    alert(JSON.stringify(error))
                  },
                  onCancel: (res: CancelResult) => {
                    console.log(res)
                    alert(JSON.stringify(res))
                  }
                })
              }}
            >
              chooseMedia
            </Button>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>上传文件接口(全平台支持)</Card.Header>
          <Card.Main>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                if (!imageLocalFiles.current) {
                  console.log('chooseMedia first!')
                  alert('chooseMedia first!')
                  return
                }
                Loading.open({
                  content: '上传中...'
                })
                Bridge.uploadFile({
                  url: '',
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    Cookie: document.cookie
                  },
                  data: {
                    uploadDir: 'test'
                  },
                  localFile: imageLocalFiles.current[0],
                  onSuccess: function (res) {
                    console.log(res)
                    alert(JSON.stringify(res))
                    Loading.close()
                  },
                  onError: function (error) {
                    console.log(error)
                    alert(JSON.stringify(error))
                    Loading.close()
                  },
                  onCancel: function (res: CancelResult) {
                    console.log(res)
                    alert(JSON.stringify(res))
                    Loading.close()
                  }
                })
              }}
            >
              uploadFile
            </Button>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>媒体文件预览接口</Card.Header>
          <Card.Main>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                Bridge.previewMedia({
                  sources: [
                    {
                      fileUrl: 'https://lyrixi.github.io/lyrixi/assets/images/logo.png'
                    },
                    {
                      fileUrl: 'https://lyrixi.github.io/lyrixi/assets/images/logo.png'
                    }
                  ],
                  index: 0
                })
              }}
            >
              previewMedia
            </Button>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>预览文件接口(仅客户端支持)</Card.Header>
          <Card.Main>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                Bridge.previewFile({
                  fileUrl: 'https://lyrixi.github.io/lyrixi/assets/images/logo.png'
                })
              }}
            >
              previewFile
            </Button>
          </Card.Main>
        </Card>

        <Divider>地理位置接口</Divider>
        <Card>
          <Card.Header>查看地理位置接口(客户端、企微、支付宝生活号、飞书、钉钉)</Card.Header>
          <Card.Main>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                Bridge.openLocation({
                  to: {
                    type: 'gcj02',
                    latitude: 39.81, // 纬度，浮点数，范围为90 ~ -90
                    longitude: 116.49, // 经度，浮点数，范围为180 ~ -180。
                    name: '终点', // 位置名
                    address: '终点地址名' // 地址详情说明
                  },
                  scale: 16 // 地图缩放级别,整形值,范围从1~28。默认为16
                })
              }}
            >
              openLocation
            </Button>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>获取地理位置接口</Card.Header>
          <Card.Main>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                Loading.open({
                  content: '定位中...'
                })
                Bridge.getLocation({
                  type: 'gcj02',
                  onSuccess: (res: SuccessResult<BridgeGetLocationResultData>) => {
                    Loading.close()
                    console.log(res)
                    alert(JSON.stringify(res))
                  },
                  onError: (error: ErrorResult) => {
                    Loading.close()
                    console.log(error)
                    alert(JSON.stringify(error))
                  }
                })
              }}
            >
              getLocation(gcj02)
            </Button>

            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                Loading.open({
                  content: '定位中...'
                })
                Bridge.getLocation({
                  type: 'wgs84',
                  onSuccess: (res: SuccessResult<BridgeGetLocationResultData>) => {
                    Loading.close()
                    console.log(res)
                    alert(JSON.stringify(res))
                  },
                  onError: (error: ErrorResult) => {
                    Loading.close()
                    console.log(error)
                    alert(JSON.stringify(error))
                  }
                })
              }}
            >
              getLocation(wgs84)
            </Button>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>分享: 客户端、微信、企微、小程序、飞书、钉钉</Card.Header>
          <Card.Main>
            <Button
              className="lyrixi-primary lyrixi-flex"
              style={{ margin: '12px 10px' }}
              radius="m"
              onClick={() => {
                Bridge.share({
                  title: '标题',
                  description: '描述',
                  imageUrl: 'https://lyrixi.github.io/lyrixi/assets/images/logo.png',
                  url: 'https://lyrixi.github.io/lyrixi/'
                })
              }}
            >
              Share
            </Button>
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}

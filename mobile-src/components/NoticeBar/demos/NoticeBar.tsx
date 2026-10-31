import React from 'react'
import { Icon, Page, NoticeBar, Icons } from 'lyrixi-mobile'

export default function NoticeBarDemo() {
  return (
    <Page>
      <Page.Main>
        {/* 基础用法 */}
        <NoticeBar type="info" title="这是一条通知信息" closable />

        {/* 带描述 */}
        <NoticeBar
          type="success"
          title="操作成功"
          description="您的操作已成功完成，系统已自动保存"
        />

        {/* 可关闭 */}
        <NoticeBar type="warning" title="注意事项" description="请仔细阅读相关说明" closable />

        {/* 错误提示 */}
        <NoticeBar
          type="error"
          title="操作失败"
          description="网络连接异常，请检查网络设置后重试"
          closable
        />

        {/* 自定义图标 */}
        <NoticeBar
          type="info"
          title="自定义图标"
          iconRender={() => <Icon svg={Icons.CircleOkFill} />}
        />

        {/* 无图标 */}
        <NoticeBar type="info" title="无图标通知" iconRender={() => null} />
      </Page.Main>
    </Page>
  )
}

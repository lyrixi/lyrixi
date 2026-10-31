---
category: Utils
group: 国际化
title: LocaleUtil
---

# LocaleUtil

## LocaleUtil.languageMap

支持的语言列表

## LocaleUtil.locale

LocaleUtil.locale 默认读取 window.lyrixiLocaleData 对象

```javascript
import React from 'react'
import { LocaleUtil } from 'lyrixi-mobile'

// 其中key的值为: 半径{0}米
LocaleUtil.locale('半径1000米', 'key', [1000]) // => 半径1000米
```

`也可以通过直接修改window.lyrixiLocaleData修改国际化数据`

## lyrixi 内部国际化文件

目录: src/utils/LocaleUtil/resources/\*.json
文件:

- en_US
- zh_CN
- zh_HK
- vi_VN

## 示例

### LocaleUtil.locale

<code src="./demos/LocaleUtil.tsx"></code>

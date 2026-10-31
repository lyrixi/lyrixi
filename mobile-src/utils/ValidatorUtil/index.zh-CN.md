---
category: Utils
group: 基本工具
title: ValidatorUtil
---

# ValidatorUtil

通用校验工具。

## 示例

<code src="./demos/ValidatorUtil.tsx"></code>

## API

| 方法                                        | 说明                                                                    |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| `isEmail(str)`                              | 校验邮箱                                                                |
| `isPhoneNumber(str [, locale [, options]])` | 校验手机号，当前仅支持 `zh_CN`（中国大陆）；不支持的 locale 返回 `null` |
| `isEmpty(value)`                            | 校验值是否为空                                                          |
| `isEqual(value, other)`                     | 深度校验两个值是否相等                                                  |
| `isPlainObject(value)`                      | 校验是否为纯对象                                                        |

手机号校验的 locale 使用 `LocaleUtil` 导出的 `LanguageCode`，当前仅支持 `zh_CN`。

---
group:
  title: 数据录入
  order: 2
order: 2
title: Tree
toc: content
---

# Tree

树形选择组件，支持一次性传入树数据或逐级 `loadData` 加载；勾选与下钻分离（左侧 Checkbox 选中，右侧箭头下钻）。

## Tree.Combo

全量 `list`：

<code src="./demos/TreeComboList.tsx"></code>

逐级 `loadData`：

<code src="./demos/TreeComboLoadData.tsx"></code>

真实接口逐级加载，每次只返回当前层：

<code src="./demos/TreeComboLoad.tsx"></code>

## Tree.Modal

全量 `list`：

<code src="./demos/TreeModalList.tsx"></code>

逐级 `loadData`：

<code src="./demos/TreeModalLoadData.tsx"></code>

## Tree.Main

全量 `list`：

<code src="./demos/TreeMainList.tsx"></code>

逐级 `loadData`：

<code src="./demos/TreeMainLoadData.tsx"></code>

### 公共 API（Main / Modal / Combo）

| 属性                   | 说明                                                                                                     | 类型                                                           | 默认值   |
| ---------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | -------- |
| value                  | 已选节点                                                                                                 | `TreeItem[]`                                                   | -        |
| list                   | 树数据（含 `id`、`name`、`children`、`parentid`）                                                        | `TreeItem[]`                                                   | -        |
| loadData               | 逐级加载；根层级传 `null`                                                                                | `(node: TreeItem \| null) => Promise<TreeLoadDataResult>`      | -        |
| loadSearchData         | 异步搜索（无全量 `list` 或需服务端检索时使用）；返回与 ListAsync `loadData` 一致（如 `noMore`、`empty`） | `(keyword: string) => Promise<ListLoadResult>`                 | -        |
| formatViewItem         | 格式化列表行；不传时使用内置默认（头像、下钻箭头等）                                                     | `(item: TreeItem, options: { index: number }) => ListViewItem` | -        |
| checkable              | 是否展示 Checkbox；`'leaf'` 时仅末级（`isLeaf: true`）展示，经 `formatViewItem` 写入行级 `checkable`     | `boolean \| 'leaf'`                                            | `true`   |
| searchVisible          | 是否展示搜索                                                                                             | `boolean`                                                      | -        |
| searchAction           | 搜索触发方式：`submit` 回车/搜索键；`input` 输入防抖（500ms）后触发                                      | `'submit' \| 'input'`                                          | `submit` |
| searchNodeTitle        | 搜索结果「节点」标题                                                                                     | `string`                                                       | `节点`   |
| searchGroupTitle       | 搜索结果「分组」标题                                                                                     | `string`                                                       | `分组`   |
| ok                     | 底部确定按钮文案（需配合 `onOk`）                                                                        | `ReactNode`                                                    | -        |
| onChange               | 选中变化                                                                                                 | `(value: TreeItem[]) => void`                                  | -        |
| onOk                   | 底部确定；不传则不展示确定按钮                                                                           | `() => void`                                                   | -        |
| defaultParentAvatarSvg | 有子节点且节点未配置头像时，默认 SVG                                                                     | `ComponentType<SVGProps<SVGSVGElement>>`                       | -        |
| defaultParentAvatarUrl | 有子节点且节点未配置头像时，默认图片 URL；传 `"default"` 时使用文件夹 SVG（`Icons.FolderColor`）         | `string`                                                       | -        |
| defaultLeafAvatarSvg   | 末级节点且未配置头像时，默认 SVG                                                                         | `ComponentType<SVGProps<SVGSVGElement>>`                       | -        |
| defaultLeafAvatarUrl   | 末级节点且未配置头像时，默认图片 URL；支持 `"default"`                                                   | `string`                                                       | -        |

四个默认头像属性均不传时，列表行不展示占位头像；节点自身已有 `avatarSvg` 或 `avatarUrl` 时不再套用默认头像。

`searchVisible` 为 true 时：已传入全量 `list` 则在组件内按关键字过滤节点；`searchAction` 为 `submit`（默认）时回车/搜索键触发，`input` 时在输入防抖 500ms 后自动触发。仅逐级 `loadData`、无完整树数据时需配合 `loadSearchData` 做远程搜索，`data.list` 需为可直接交给 List 的数据（分组头用 `type: 'group'`）。

`TreeLoadDataResult` 的 `data` 为 `{ list?: ListItem[] }`；节点 `isLeaf: true` 表示末级，不再展示下钻箭头。

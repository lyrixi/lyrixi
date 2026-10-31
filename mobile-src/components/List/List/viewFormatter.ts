import type { ListViewFormatterParams, ListItem, ListViewItem } from './../types'

// 将接口返回的 ListItem[] 转为带 `_raw` 的 ListViewItem[]，供列表渲染
// 列表须扁平；仅 type: 'group' 为分组头，缺省即为普通项（由业务拉平）
function viewFormatter(
  list: ListItem[] | undefined,
  params: ListViewFormatterParams
): ListViewItem[] | undefined {
  const { formatViewItem } = params

  return list?.map((item, index) => {
    // 新建对象挂 _raw，指向原始 item，避免循环引用；type 以业务 list 为准
    if (typeof formatViewItem === 'function') {
      const formatted = formatViewItem(item, { index })
      return { ...formatted, _raw: item, type: item.type ?? formatted.type }
    }
    return { ...item, _raw: item } as ListViewItem
  })
}

export default viewFormatter

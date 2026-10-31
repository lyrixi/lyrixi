import type { DistrictFormatCountryRegionsNode } from '../../types'

// 根据节点的 nature 字段为行政区划树设置类型标记
function formatCountryRegions(
  tree: DistrictFormatCountryRegionsNode[],
  countryId: string | number
): DistrictFormatCountryRegionsNode[] {
  for (const item of tree) {
    item.parentid = countryId
  }

  const provinceNatures = new Set([11, 12, 14])
  const municipalityNature = 13
  const cityNatures = new Set([21, 22, 23, 24])
  const prefectureNature = 25
  const districtNatures = new Set([31, 32, 33, 34, 35, 36, 37, 38, 39])
  const streetNatures = new Set([41, 42, 43, 44, 45, 46, 47])

  function getTypesByNature(nature: number | string | undefined): string[] | undefined {
    const code = Number(nature)
    if (!Number.isFinite(code)) return undefined

    if (code === municipalityNature) return ['province', 'city', 'municipality']
    if (code === prefectureNature) return ['city', 'prefecture']
    if (provinceNatures.has(code)) return ['province']
    if (cityNatures.has(code)) return ['city']
    if (districtNatures.has(code)) return ['district']
    if (streetNatures.has(code)) return ['street']
    return undefined
  }

  function addNodeType(
    nodes: DistrictFormatCountryRegionsNode[]
  ): DistrictFormatCountryRegionsNode[] {
    if (!Array.isArray(nodes)) return nodes
    return nodes.map((node) => {
      if ('anchor' in node) {
        delete node.anchor
      }
      const types = getTypesByNature(node?.nature)
      if (types && Array.isArray(types)) {
        node.type = types
      }

      if (Array.isArray(node.children)) {
        node.children = addNodeType(node.children)
      }
      return node
    })
  }

  return addNodeType(tree)
}

export default formatCountryRegions

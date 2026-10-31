import loadCountries from './loadCountries'
import loadCountryRegions from './loadCountryRegions'
import loadStreets from './loadStreets'
import formatCountryRegions from './formatCountryRegions'

import type {
  DistrictFormatCountryRegionsNode,
  DistrictMainApiDistrictNode,
  DistrictResultState
} from '../../types'

const api = {
  loadCountries: async function (): Promise<DistrictResultState> {
    const result = await loadCountries()
    const list = result.data?.list
    if (result?.status === 'success' && Array.isArray(list)) {
      return {
        ...result,
        data: {
          ...result.data,
          list: (list as DistrictMainApiDistrictNode[]).map((node) => {
            node.type = ['country']
            return node
          })
        }
      }
    }
    return result
  },

  loadCountryRegions: async function (countryId: string | number): Promise<DistrictResultState> {
    const result = await loadCountryRegions(countryId)
    const list = result.data?.list
    if (result?.status === 'success' && Array.isArray(list)) {
      return {
        ...result,
        data: {
          ...result.data,
          list: formatCountryRegions(list as DistrictFormatCountryRegionsNode[], countryId)
        }
      }
    }
    return result
  },

  loadStreets: async function (districtId: string | number): Promise<DistrictResultState> {
    const result = await loadStreets(districtId)
    const list = result.data?.list
    if (result.status === 'success' && Array.isArray(list)) {
      return {
        ...result,
        data: {
          ...result.data,
          list: (list as DistrictMainApiDistrictNode[]).map((item: DistrictMainApiDistrictNode) => {
            return {
              id: item.id,
              name: item.name,
              parentid: districtId,
              type: ['street'],
              isLeaf: true
            }
          })
        }
      }
    }
    return result
  }
}

export default api

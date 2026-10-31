// 百度 Place Search WebService 最小形态（bmapQueryNearby 内使用）
export interface BmapPlaceSearchLocation {
  lat: number
  lng: number
}

export interface BmapPlaceSearchResultItem {
  name?: string
  address?: string
  location?: BmapPlaceSearchLocation
}

export interface BmapPlaceSearchResponse {
  status: number
  message?: string
  results?: BmapPlaceSearchResultItem[]
}

// google.maps.places 最小形态（googleQueryNearby 内使用）
export interface GooglePlaceLatLngCallable {
  lat: () => number
  lng: () => number
}

export type GooglePlacesApi = {
  Place: {
    searchNearby: (r: Record<string, unknown>) => Promise<{ places: unknown[] }>
    searchByText: (r: Record<string, unknown>) => Promise<{ places: unknown[] }>
  }
  SearchNearbyRankPreference: { DISTANCE: string }
}

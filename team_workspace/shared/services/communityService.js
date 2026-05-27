import { apiRequest, isApiEnabled } from './api'
import { allCommunities, filterCommunities } from '@/constants/communities'

const ENDPOINTS = {
  list: '/communities',
  byId: (id) => `/communities/${id}`,
}

export async function fetchCommunities(params = {}) {
  if (isApiEnabled()) {
    const qs = new URLSearchParams()
    if (params.type) qs.set('type', params.type)
    if (params.q) qs.set('q', params.q)
    const query = qs.toString()
    const json = await apiRequest(`${ENDPOINTS.list}${query ? `?${query}` : ''}`)
    return Array.isArray(json) ? json : (json.data ?? [])
  }

  let list = allCommunities
  if (params.type === 'major' || params.type === 'subject') {
    list = list.filter((c) => c.type === params.type)
  }
  return filterCommunities(list, params.q ?? '')
}

export async function fetchCommunityById(id) {
  if (isApiEnabled()) {
    return apiRequest(ENDPOINTS.byId(id))
  }
  return allCommunities.find((c) => c.id === id) ?? null
}

export async function createCommunity(data) {
  if (isApiEnabled()) {
    return apiRequest(ENDPOINTS.list, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
  return { id: `mock-${Date.now()}`, ...data }
}

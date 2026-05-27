import { apiRequest } from './client'
import { ENDPOINTS } from './endpoints'
import { isApiEnabled } from '@/constants/env'
import { allCommunities, filterCommunities } from '@/constants/communities'

/**
 * @param {{ type?: 'major'|'subject', q?: string }} [params]
 */
export async function fetchCommunities(params = {}) {
  if (isApiEnabled()) {
    const qs = new URLSearchParams()
    if (params.type) qs.set('type', params.type)
    if (params.q) qs.set('q', params.q)
    const query = qs.toString()
    const json = await apiRequest(`${ENDPOINTS.communities.list}${query ? `?${query}` : ''}`)
    return Array.isArray(json) ? json : (json.data ?? [])
  }

  let list = allCommunities
  if (params.type === 'major' || params.type === 'subject') {
    list = list.filter((c) => c.type === params.type)
  }
  return filterCommunities(list, params.q ?? '')
}

/**
 * @param {string} id
 */
export async function fetchCommunityById(id) {
  if (isApiEnabled()) {
    return apiRequest(ENDPOINTS.communities.byId(id))
  }
  return allCommunities.find((c) => c.id === id) ?? null
}

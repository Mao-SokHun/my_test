import { apiRequest } from './api'
import { ENDPOINTS } from './endpoints'
import { isApiEnabled } from '@/constants/env'

/**
 * @param {{ type?: 'major'|'subject', q?: string }} [params]
 */
export async function fetchCommunities(params = {}) {
  if (!isApiEnabled()) throw new Error('Backend API is required to fetch communities.')
  const qs = new URLSearchParams()
  if (params.type) qs.set('type', params.type)
  if (params.q) qs.set('q', params.q)
  const query = qs.toString()
  const json = await apiRequest(`${ENDPOINTS.communities.list}${query ? `?${query}` : ''}`)
  return Array.isArray(json) ? json : (json.data ?? [])
}

/**
 * @param {string} id
 */
export async function fetchCommunityById(id) {
  if (!isApiEnabled()) throw new Error('Backend API is required to fetch community detail.')
  return apiRequest(ENDPOINTS.communities.byId(id))
}

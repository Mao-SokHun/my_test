import { apiRequest, isApiEnabled } from './api'

const ENDPOINTS = {
  list: '/communities',
  byId: (id) => `/communities/${id}`,
}

export async function fetchCommunities(params = {}) {
  if (!isApiEnabled()) throw new Error('Backend API is required to fetch communities.')
  const qs = new URLSearchParams()
  if (params.type) qs.set('type', params.type)
  if (params.q) qs.set('q', params.q)
  const query = qs.toString()
  const json = await apiRequest(`${ENDPOINTS.list}${query ? `?${query}` : ''}`)
  return Array.isArray(json) ? json : (json.data ?? [])
}

export async function fetchCommunityById(id) {
  if (!isApiEnabled()) throw new Error('Backend API is required to fetch community detail.')
  return apiRequest(ENDPOINTS.byId(id))
}

export async function createCommunity(data) {
  if (!isApiEnabled()) throw new Error('Backend API is required to create community.')
  return apiRequest(ENDPOINTS.list, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

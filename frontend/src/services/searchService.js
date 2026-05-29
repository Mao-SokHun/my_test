import { apiRequest, isApiEnabled } from './api'

const ENDPOINTS = {
  search: '/search',
}

export async function search(query, params = {}) {
  if (!isApiEnabled()) throw new Error('Backend API is required for search.')
  const qs = new URLSearchParams({ q: query, ...params })
  return apiRequest(`${ENDPOINTS.search}?${qs.toString()}`)
}

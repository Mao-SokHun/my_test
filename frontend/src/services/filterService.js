import { apiRequest, isApiEnabled } from './api'

const ENDPOINTS = {
  filters: '/filters',
}

export async function fetchFilterOptions() {
  if (!isApiEnabled()) throw new Error('Backend API is required to fetch filter options.')
  return apiRequest(ENDPOINTS.filters)
}

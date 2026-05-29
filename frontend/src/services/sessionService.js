import { apiRequest, isApiEnabled } from './api'

const ENDPOINTS = {
  list: '/sessions',
  byId: (id) => `/sessions/${id}`,
}

export async function fetchSessions() {
  if (!isApiEnabled()) throw new Error('Backend API is required to fetch sessions.')
  const json = await apiRequest(ENDPOINTS.list)
  return Array.isArray(json) ? json : (json.data ?? [])
}

export async function createSession(payload) {
  if (!isApiEnabled()) throw new Error('Backend API is required to create session.')
  return apiRequest(ENDPOINTS.list, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function updateSession(id, payload) {
  if (!isApiEnabled()) throw new Error('Backend API is required to update session.')
  return apiRequest(ENDPOINTS.byId(id), {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function deleteSession(id) {
  if (!isApiEnabled()) throw new Error('Backend API is required to delete session.')
  return apiRequest(ENDPOINTS.byId(id), { method: 'DELETE' })
}

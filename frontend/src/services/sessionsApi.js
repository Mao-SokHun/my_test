import { apiRequest } from './api'
import { ENDPOINTS } from './endpoints'
import { isApiEnabled } from '@/constants/env'

export async function fetchSessions() {
  if (!isApiEnabled()) throw new Error('Backend API is required to fetch sessions.')
  const json = await apiRequest(ENDPOINTS.sessions.list)
  return Array.isArray(json) ? json : (json.data ?? [])
}

/**
 * @param {object} payload
 */
export async function createSession(payload) {
  if (!isApiEnabled()) throw new Error('Backend API is required to create session.')
  return apiRequest(ENDPOINTS.sessions.list, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

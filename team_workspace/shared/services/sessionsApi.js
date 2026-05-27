import { apiRequest } from './client'
import { ENDPOINTS } from './endpoints'
import { isApiEnabled } from '@/constants/env'
import { scheduleEvents as mockSessions } from '@/constants/mockData'

export async function fetchSessions() {
  if (isApiEnabled()) {
    const json = await apiRequest(ENDPOINTS.sessions.list)
    return Array.isArray(json) ? json : (json.data ?? [])
  }
  return mockSessions
}

/**
 * @param {object} payload
 */
export async function createSession(payload) {
  if (isApiEnabled()) {
    return apiRequest(ENDPOINTS.sessions.list, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }
  return { id: `mock-${Date.now()}`, ...payload, status: 'upcoming' }
}

import { apiRequest, isApiEnabled } from './api'
import { scheduleEvents as mockSessions } from '@/constants/mockData'

const ENDPOINTS = {
  list: '/sessions',
  byId: (id) => `/sessions/${id}`,
}

export async function fetchSessions() {
  if (isApiEnabled()) {
    const json = await apiRequest(ENDPOINTS.list)
    return Array.isArray(json) ? json : (json.data ?? [])
  }
  return mockSessions
}

export async function createSession(payload) {
  if (isApiEnabled()) {
    return apiRequest(ENDPOINTS.list, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }
  return { id: `mock-${Date.now()}`, ...payload, status: 'upcoming' }
}

export async function updateSession(id, payload) {
  if (isApiEnabled()) {
    return apiRequest(ENDPOINTS.byId(id), {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  }
  return { id, ...payload }
}

export async function deleteSession(id) {
  if (isApiEnabled()) {
    return apiRequest(ENDPOINTS.byId(id), { method: 'DELETE' })
  }
  return { success: true }
}

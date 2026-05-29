import { apiRequest } from './api'
import { ENDPOINTS } from './endpoints'
import { isApiEnabled } from '@/constants/env'

/**
 * @param {{ email: string, password: string }} credentials
 */
export async function login(credentials) {
  if (!isApiEnabled()) throw new Error('Backend API is required for authentication.')
  const json = await apiRequest(ENDPOINTS.auth.login, {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
  if (json.token) localStorage.setItem('rokkru_token', json.token)
  return json.user ?? json
}

export async function fetchCurrentUser() {
  if (!isApiEnabled()) throw new Error('Backend API is required to fetch current user.')
  return apiRequest(ENDPOINTS.auth.me)
}

export async function logout() {
  if (isApiEnabled()) {
    try {
      await apiRequest(ENDPOINTS.auth.logout, { method: 'POST' })
    } catch {
      /* ignore */
    }
  }
  localStorage.removeItem('rokkru_token')
}

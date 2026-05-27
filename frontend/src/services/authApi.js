import { apiRequest } from './client'
import { ENDPOINTS } from './endpoints'
import { isApiEnabled } from '@/constants/env'

const MOCK_BY_EMAIL = {
  'student@rokkru.com': { id: '1', name: 'Alex Johnson', email: 'student@rokkru.com', role: 'student' },
  'teacher@rokkru.com': { id: '2', name: 'Dr. Phe Sophy', email: 'teacher@rokkru.com', role: 'teacher' },
  'admin@rokkru.com': { id: '3', name: 'Super Admin', email: 'admin@rokkru.com', role: 'admin' },
}

/**
 * @param {{ email: string, password: string }} credentials
 */
export async function login(credentials) {
  if (isApiEnabled()) {
    const json = await apiRequest(ENDPOINTS.auth.login, {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
    if (json.token) localStorage.setItem('rokkru_token', json.token)
    return json.user ?? json
  }

  const user = MOCK_BY_EMAIL[credentials.email] ?? MOCK_BY_EMAIL['student@rokkru.com']
  localStorage.setItem('rokkru_token', 'mock-token')
  return user
}

export async function fetchCurrentUser() {
  if (isApiEnabled()) {
    return apiRequest(ENDPOINTS.auth.me)
  }
  try {
    const raw = localStorage.getItem('rokkru_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
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

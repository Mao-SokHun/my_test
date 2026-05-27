import { apiRequest } from './client'
import { ENDPOINTS } from './endpoints'
import { isApiEnabled } from '@/constants/env'

/** Placeholder until admin user management is wired */
const MOCK_USERS = [
  { id: '1', name: 'Alex Johnson', email: 'student@rokkru.com', role: 'student', status: 'active' },
  { id: '2', name: 'Dr. Phe Sophy', email: 'teacher@rokkru.com', role: 'teacher', status: 'active' },
]

export async function fetchUsers() {
  if (isApiEnabled()) {
    const json = await apiRequest(ENDPOINTS.users.list)
    return Array.isArray(json) ? json : (json.data ?? [])
  }
  return MOCK_USERS
}

import { apiRequest } from './api'
import { ENDPOINTS } from './endpoints'
import { isApiEnabled } from '@/constants/env'

export async function fetchUsers() {
  if (!isApiEnabled()) throw new Error('Backend API is required to fetch users.')
  const json = await apiRequest(ENDPOINTS.users.list)
  return Array.isArray(json) ? json : (json.data ?? [])
}

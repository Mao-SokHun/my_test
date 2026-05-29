import { apiRequest } from './api'
import { ENDPOINTS } from './endpoints'
import { isApiEnabled } from '@/constants/env'

export async function fetchAdminReports() {
  if (!isApiEnabled()) throw new Error('Backend API is required to fetch admin reports.')
  return apiRequest(ENDPOINTS.admin.reports)
}

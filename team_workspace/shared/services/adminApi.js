import { apiRequest } from './client'
import { ENDPOINTS } from './endpoints'
import { isApiEnabled } from '@/constants/env'

export async function fetchAdminReports() {
  if (isApiEnabled()) {
    return apiRequest(ENDPOINTS.admin.reports)
  }
  return {
    users: 1240,
    teachers: 86,
    sessions: 432,
    revenue: 12450,
  }
}

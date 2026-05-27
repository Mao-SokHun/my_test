import { apiRequest, isApiEnabled } from './api'
import { DEFAULT_FILTER_OPTION_SET } from '@/constants/teacherFilters'

const ENDPOINTS = {
  filters: '/filters',
}

export async function fetchFilterOptions() {
  if (isApiEnabled()) {
    return apiRequest(ENDPOINTS.filters)
  }
  return DEFAULT_FILTER_OPTION_SET
}

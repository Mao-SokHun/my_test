import { FILTER_ALL } from '../constants/filters'

/** Map UI filter state → API query params (omit “all” sentinels) */
export function toTeacherQueryParams(filters = {}) {
  const params = {}
  if (filters.major && filters.major !== FILTER_ALL.major) params.major = filters.major
  if (filters.subject && filters.subject !== FILTER_ALL.subject) params.subject = filters.subject
  if (filters.location && filters.location !== FILTER_ALL.location) params.location = filters.location
  if (filters.sort && filters.sort !== 'Best Match') params.sort = filters.sort
  if (filters.type && filters.type !== FILTER_ALL.type) params.type = filters.type
  if (filters.time && filters.time !== FILTER_ALL.time) params.time = filters.time
  if (filters.page) params.page = String(filters.page)
  if (filters.pageSize) params.pageSize = String(filters.pageSize)
  return params
}

export function buildQueryString(params) {
  const q = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') q.set(k, String(v))
  })
  const s = q.toString()
  return s ? `?${s}` : ''
}

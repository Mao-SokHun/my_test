import { apiRequest, isApiEnabled } from './api'
import { filterTeachers } from '@/utils/filterTeachers'
import { buildQueryString, toTeacherQueryParams } from '@/utils/teacherQuery'
import { teachers as mockTeachers } from '@/constants/mockData'

const ENDPOINTS = {
  list: '/teachers',
  byId: (id) => `/teachers/${id}`,
}

export async function fetchTeachers(filters = {}) {
  const params = toTeacherQueryParams(filters)
  const qs = buildQueryString(params)

  if (isApiEnabled()) {
    const json = await apiRequest(`${ENDPOINTS.list}${qs}`)
    if (Array.isArray(json)) return { items: json, total: json.length }
    return {
      items: json.data ?? json.items ?? [],
      total: json.total ?? json.data?.length ?? 0,
      page: json.page,
      pageSize: json.pageSize,
    }
  }

  const items = filterTeachers(mockTeachers, filters)
  const page = filters.page ?? 1
  const pageSize = filters.pageSize ?? items.length
  const start = (page - 1) * pageSize
  return {
    items: items.slice(start, start + pageSize),
    total: items.length,
    page,
    pageSize,
  }
}

export async function fetchTeacherById(id) {
  if (isApiEnabled()) {
    return apiRequest(ENDPOINTS.byId(id))
  }
  return mockTeachers.find((t) => String(t.id) === String(id)) ?? null
}

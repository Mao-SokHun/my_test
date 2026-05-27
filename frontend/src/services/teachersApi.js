import { apiRequest } from './client'
import { ENDPOINTS } from './endpoints'
import { isApiEnabled } from '@/constants/env'
import { buildQueryString, toTeacherQueryParams } from '@/utils/teacherQuery'
import { filterTeachers } from '@/utils/filterTeachers'
import { teachers as mockTeachers } from '@/constants/mockData'

/**
 * @param {import('@/types/entities').TeacherFilters & { page?: number, pageSize?: number }} [filters]
 * @returns {Promise<import('@/types/entities').PaginatedResult>}
 */
export async function fetchTeachers(filters = {}) {
  const params = toTeacherQueryParams(filters)
  const qs = buildQueryString(params)

  if (isApiEnabled()) {
    const json = await apiRequest(`${ENDPOINTS.teachers.list}${qs}`)
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

/**
 * @param {string|number} id
 * @returns {Promise<import('@/types/entities').Teacher|null>}
 */
export async function fetchTeacherById(id) {
  if (isApiEnabled()) {
    return apiRequest(ENDPOINTS.teachers.byId(id))
  }
  return mockTeachers.find((t) => String(t.id) === String(id)) ?? null
}

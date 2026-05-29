import { apiRequest } from './api'
import { ENDPOINTS } from './endpoints'
import { isApiEnabled } from '@/constants/env'
import { buildQueryString, toTeacherQueryParams } from '@/utils/teacherQuery'

/**
 * @param {import('@/types/entities').TeacherFilters & { page?: number, pageSize?: number }} [filters]
 * @returns {Promise<import('@/types/entities').PaginatedResult>}
 */
export async function fetchTeachers(filters = {}) {
  const params = toTeacherQueryParams(filters)
  const qs = buildQueryString(params)

  if (!isApiEnabled()) throw new Error('Backend API is required to fetch teachers.')
  const json = await apiRequest(`${ENDPOINTS.teachers.list}${qs}`)
  if (Array.isArray(json)) return { items: json, total: json.length }
  return {
    items: json.data ?? json.items ?? [],
    total: json.total ?? json.data?.length ?? 0,
    page: json.page,
    pageSize: json.pageSize,
  }
}

/**
 * @param {string|number} id
 * @returns {Promise<import('@/types/entities').Teacher|null>}
 */
export async function fetchTeacherById(id) {
  if (!isApiEnabled()) throw new Error('Backend API is required to fetch teacher details.')
  return apiRequest(ENDPOINTS.teachers.byId(id))
}

// ================ Start teacher service ================
// ? Bridge: Student/Search UI ("Teacher") → backend Mentor API
// ? Used by: useTeachers, Home, Search — calls searchMentors when VITE_API_URL set

import { isApiEnabled } from './api'
import { searchMentors, fetchMentorById } from './mentorsApi'
import { mapMentorToTeacher } from '@/utils/mentorMapper'
import { filterTeachers } from '@/utils/filterTeachers'
import { toTeacherQueryParams } from '@/utils/teacherQuery'
import { teachers as mockTeachers } from '@/constants/mockData'

// ? UI pageSize → backend limit; UI sort labels → backend sort values
function mapListParams(filters = {}) {
  const base = toTeacherQueryParams(filters)
  const params = { ...base }
  if (base.pageSize) {
    params.limit = base.pageSize
    delete params.pageSize
  }
  if (base.sort === 'Best Match') params.sort = 'newest'
  return params
}

// ? GET /mentors/search — returns { items, total, page, pageSize }
export async function fetchTeachers(filters = {}) {
  if (isApiEnabled()) {
    const data = await searchMentors(mapListParams(filters))
    const items = (data?.items ?? []).map(mapMentorToTeacher)
    return {
      items,
      total: data?.total ?? items.length,
      page: data?.page,
      pageSize: data?.limit,
    }
  }

  // ? No VITE_API_URL — use mock data from constants/mockData
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

// ? GET /mentors/:id — one teacher card / profile page
export async function fetchTeacherById(id) {
  if (isApiEnabled()) {
    const mentor = await fetchMentorById(id)
    return mapMentorToTeacher(mentor)
  }
  return mockTeachers.find((t) => String(t.id) === String(id)) ?? null
}

// ================ End teacher service ================

// ================ Start teacher service ================
// ? Bridge: Student/Search UI ("Teacher") → backend Mentor API
// ? Used by: useTeachers, Home, Search — calls searchMentors when VITE_API_URL set

import { isApiEnabled } from './api'
import { searchMentors, fetchMentorById } from './mentorsApi'
import { mapMentorToTeacher } from '@/utils/mentorMapper'
import { toTeacherQueryParams } from '@/utils/teacherQuery'

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
  if (!isApiEnabled()) throw new Error('Backend API is required to fetch teachers.')
  const data = await searchMentors(mapListParams(filters))
  const items = (data?.items ?? []).map(mapMentorToTeacher)
  return {
    items,
    total: data?.total ?? items.length,
    page: data?.page,
    pageSize: data?.limit,
  }
}

// ? GET /mentors/:id — one teacher card / profile page
export async function fetchTeacherById(id) {
  if (!isApiEnabled()) throw new Error('Backend API is required to fetch teacher details.')
  const mentor = await fetchMentorById(id)
  return mapMentorToTeacher(mentor)
}

// ================ End teacher service ================

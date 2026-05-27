// ================ Start mentors API ================
// ? 1:1 with backend_rokkru/routes/v1/mentors.js
// ? Env: VITE_API_URL=http://localhost:3000/api/v1

import { apiRequest } from './api'
import { buildQueryString } from '@/utils/teacherQuery'

// ? Path constants — keep in sync with backend routes
const M = {
  list: '/mentors',
  search: '/mentors/search',
  me: '/mentors/me',
  byId: (id) => `/mentors/${id}`,
  analytics: '/mentors/me/analytics',
  portfolio: (id) => `/mentors/${id}/portfolio`,
  portfolioUpload: (id) => `/mentors/${id}/portfolio/upload`,
  skills: (id) => `/mentors/${id}/skills`,
  skillCatalog: '/mentors/skills/catalog',
  posts: (id) => `/mentors/${id}/posts`,
  postById: (postId) => `/mentors/posts/${postId}`,
}

// ? Backend always returns { success, data } or { success: false, error }
async function unwrap(requestPromise) {
  const json = await requestPromise
  if (json && typeof json === 'object' && json.success === false) {
    throw new Error(json.error || 'Request failed')
  }
  if (json && typeof json === 'object' && 'data' in json) {
    return json.data
  }
  return json
}

// ---------- Task #1 CRUD + #5 Search ----------
export async function fetchMentors(params = {}) {
  const qs = buildQueryString(mapListParams(params))
  return unwrap(apiRequest(`${M.list}${qs}`))
}

export async function searchMentors(params = {}) {
  const qs = buildQueryString(mapListParams(params))
  return unwrap(apiRequest(`${M.search}${qs}`))
}

export async function fetchMentorMe() {
  return unwrap(apiRequest(M.me))
}

export async function fetchMentorById(id) {
  return unwrap(apiRequest(M.byId(id)))
}

export async function createMentorProfile(payload) {
  return unwrap(apiRequest(M.list, {
    method: 'POST',
    body: JSON.stringify(payload),
  }))
}

export async function updateMentorProfile(userId, payload) {
  return unwrap(apiRequest(M.byId(userId), {
    method: 'PUT',
    body: JSON.stringify(payload),
  }))
}

export async function deleteMentorProfile(userId) {
  return unwrap(apiRequest(M.byId(userId), { method: 'DELETE' }))
}

function mapListParams(filters = {}) {
  const params = {}
  if (filters.page) params.page = filters.page
  if (filters.pageSize) params.limit = filters.pageSize
  if (filters.q) params.q = filters.q
  if (filters.sort === 'Best Match' || !filters.sort) params.sort = 'newest'
  if (filters.sort === 'Experience') params.sort = 'experience'
  if (filters.minExperience) params.minExperience = filters.minExperience
  if (filters.skillId) params.skillId = filters.skillId
  if (filters.subSkillId) params.subSkillId = filters.subSkillId
  return params
}

// ---------- Task #6 Analytics ----------
export async function fetchMyAnalytics() {
  return unwrap(apiRequest(M.analytics))
}

// ---------- Task #2 Portfolio ----------
export async function fetchMentorPortfolio(userId) {
  return unwrap(apiRequest(M.portfolio(userId)))
}

export async function addPortfolioItem(userId, payload) {
  return unwrap(apiRequest(M.portfolio(userId), {
    method: 'POST',
    body: JSON.stringify(payload),
  }))
}

export async function deletePortfolioItem(userId, link) {
  return unwrap(apiRequest(`${M.portfolio(userId)}/${encodeURIComponent(link)}`, {
    method: 'DELETE',
  }))
}

// ---------- Task #3 Skills ----------
export async function fetchSkillCatalog() {
  return unwrap(apiRequest(M.skillCatalog))
}

export async function fetchMentorSkills(userId) {
  return unwrap(apiRequest(M.skills(userId)))
}

export async function addMentorSkill(userId, payload) {
  return unwrap(apiRequest(M.skills(userId), {
    method: 'POST',
    body: JSON.stringify(payload),
  }))
}

export async function removeMentorSkill(userId, msId) {
  return unwrap(apiRequest(`${M.skills(userId)}/${msId}`, { method: 'DELETE' }))
}

// ---------- Task #4 Posts ----------
export async function fetchMentorPosts(userId, params = {}) {
  const qs = buildQueryString(params)
  return unwrap(apiRequest(`${M.posts(userId)}${qs}`))
}

export async function createMentorPost(userId, payload) {
  return unwrap(apiRequest(M.posts(userId), {
    method: 'POST',
    body: JSON.stringify(payload),
  }))
}

export async function updateMentorPost(postId, payload) {
  return unwrap(apiRequest(M.postById(postId), {
    method: 'PUT',
    body: JSON.stringify(payload),
  }))
}

export async function deleteMentorPost(postId) {
  return unwrap(apiRequest(M.postById(postId), { method: 'DELETE' }))
}
// ================ End mentors API ================

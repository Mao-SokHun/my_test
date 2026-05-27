// ================ Start auth service ================
// ? Login sets localStorage rokkru_token → mentor protected routes (auth.js)

import { apiRequest, isApiEnabled } from './api'

const ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  me: '/auth/me',
}

const MOCK_BY_EMAIL = {
  'student@rokkru.com': { id: '1', user_id: 1, name: 'Alex Johnson', email: 'student@rokkru.com', role: 'student' },
  'teacher@rokkru.com': { id: '2', user_id: 2, name: 'Dr. Phe Sophy', email: 'teacher@rokkru.com', role: 'teacher' },
  'admin@rokkru.com': { id: '3', user_id: 3, name: 'Super Admin', email: 'admin@rokkru.com', role: 'admin' },
}

function unwrapData(json) {
  if (json && json.success === true && json.data) return json.data
  return json
}

function mapAuthUser(data, roleHint = 'student') {
  const payload = unwrapData(data)
  const user = payload.user ?? payload
  const mentor = payload.mentor
  const name = mentor
    ? `${mentor.firstname || ''} ${mentor.lastname || ''}`.trim()
    : user.name || user.email?.split('@')[0] || 'User'

  let role = roleHint
  if (mentor) role = 'teacher'
  if (user.role) role = user.role

  const uid = user.user_id ?? user.id

  return {
    id: String(uid),
    user_id: uid,
    name,
    email: user.email,
    role,
    mentor,
  }
}

export async function login(credentials) {
  if (isApiEnabled()) {
    const raw = await apiRequest(ENDPOINTS.login, {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })
    const data = unwrapData(raw)
    const token = data.token ?? raw.token
    if (token) localStorage.setItem('rokkru_token', token)
    const mapped = mapAuthUser(data, credentials.role)
    localStorage.setItem('rokkru_user', JSON.stringify(mapped))
    return mapped
  }

  const user = MOCK_BY_EMAIL[credentials.email] ?? MOCK_BY_EMAIL['student@rokkru.com']
  localStorage.setItem('rokkru_token', 'mock-token')
  localStorage.setItem('rokkru_user', JSON.stringify(user))
  return user
}

export async function register(data) {
  if (isApiEnabled()) {
    const body = {
      email: data.email,
      password: data.password,
      user_type_id: data.user_type_id,
    }
    if (data.role === 'teacher' || data.mentorProfile) {
      body.mentorProfile = data.mentorProfile ?? {
        firstname: data.firstName ?? data.firstname ?? 'Mentor',
        lastname: data.lastName ?? data.lastname ?? 'User',
        experience_years: 0,
      }
    }
    const raw = await apiRequest(ENDPOINTS.register, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const res = unwrapData(raw)
    const token = res.token ?? raw.token
    if (token) localStorage.setItem('rokkru_token', token)
    const mapped = mapAuthUser(res, data.role)
    localStorage.setItem('rokkru_user', JSON.stringify(mapped))
    return mapped
  }
  const user = { id: `mock-${Date.now()}`, user_id: Date.now(), ...data, role: data.role || 'student' }
  localStorage.setItem('rokkru_token', 'mock-token')
  localStorage.setItem('rokkru_user', JSON.stringify(user))
  return user
}

export async function fetchCurrentUser() {
  if (isApiEnabled()) {
    const raw = await apiRequest(ENDPOINTS.me)
    return mapAuthUser(unwrapData(raw))
  }
  try {
    const raw = localStorage.getItem('rokkru_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export async function logout() {
  if (isApiEnabled()) {
    try { await apiRequest(ENDPOINTS.logout, { method: 'POST' }) } catch { /* ignore */ }
  }
  localStorage.removeItem('rokkru_token')
  localStorage.removeItem('rokkru_user')
}
// ================ End auth service ================
